import * as core from '@actions/core';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

async function run() {
  try {
    const actionPath = core.getInput('action-yml');
    const readmePath = core.getInput('readme-md');
    const update = core.getInput('update') === 'true';

    if (!fs.existsSync(actionPath)) {
      throw new Error(`Action file not found at ${actionPath}`);
    }

    const actionContent = fs.readFileSync(actionPath, 'utf8');
    const action = yaml.load(actionContent) as any;

    let markdown = '## Inputs\n\n';
    if (action.inputs) {
      markdown += '| Input | Description | Default | Required |\n';
      markdown += '| :--- | :--- | :--- | :--- |\n';
      for (const [key, value] of Object.entries(action.inputs as any)) {
        markdown += `| `\`${key}\` ` | ${(value as any).description || ''} | `\`${(value as any).default || ''}\` ` | ${(value as any).required ? '✅' : '❌'} |\n`;
      }
    } else {
      markdown += 'No inputs defined.\n';
    }

    markdown += '\n## Outputs\n\n';
    if (action.outputs) {
      markdown += '| Output | Description |\n';
      markdown += '| :--- | :--- |\n';
      for (const [key, value] of Object.entries(action.outputs as any)) {
        markdown += `| `\`${key}\` ` | ${(value as any).description || ''} |\n`;
      }
    } else {
      markdown += 'No outputs defined.\n';
    }

    markdown += '\n## Usage\n\n';
    markdown += '`\`yaml\n';
    markdown += `- uses: ${process.env.GITHUB_REPOSITORY || 'owner/repo'}@v1\n`;
    if (action.inputs) {
      markdown += '  with:\n';
      for (const key of Object.keys(action.inputs)) {
        markdown += `    ${key}: ''\n`;
      }
    }
    markdown += '`\`\n';

    core.setOutput('markdown', markdown);

    if (update && fs.existsSync(readmePath)) {
      let readme = fs.readFileSync(readmePath, 'utf8');
      const startTag = '<!-- START_ACTION_DOCS -->';
      const endTag = '<!-- END_ACTION_DOCS -->';

      if (readme.includes(startTag) && readme.includes(endTag)) {
        const regex = new RegExp(`${startTag}[\\s\\S]*${endTag}`);
        readme = readme.replace(regex, `${startTag}\n\n${markdown}\n${endTag}`);
        fs.writeFileSync(readmePath, readme);
        core.info('README.md updated between tags.');
      } else {
        core.info('Tags not found in README.md. Generated markdown was output but not written to file.');
      }
    }

  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
