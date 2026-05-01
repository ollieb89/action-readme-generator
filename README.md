# Action README Generator 📝

GitHub Action to automatically generate and update Inputs, Outputs, and Usage sections in your `README.md` from your `action.yml`.

## Features

- 🕵️ Parses `action.yml` automatically
- 📝 Generates clean Markdown tables for Inputs and Outputs
- 🚀 Creates a copy-paste Usage example
- 🔄 Updates `README.md` between tags (`<!-- START_ACTION_DOCS -->` and `<!-- END_ACTION_DOCS -->`)

## Usage

Add the tags to your `README.md`:

```markdown
# My Awesome Action

<!-- START_ACTION_DOCS -->
<!-- END_ACTION_DOCS -->
```

Then add this action to your workflow:

```yaml
- uses: ollieb89/action-readme-generator@v1
  with:
    action-yml: 'action.yml'
    readme-md: 'README.md'
    update: 'true'
```

<!-- START_ACTION_DOCS -->
## Inputs

| Input | Description | Default | Required |
| :--- | :--- | :--- | :--- |
| `action-yml`  | Path to action.yml | `action.yml`  | ❌ |
| `readme-md`  | Path to README.md | `README.md`  | ❌ |
| `update`  | Whether to update the README.md file directly | `true`  | ❌ |

## Outputs

| Output | Description |
| :--- | :--- |
| `markdown`  | The generated markdown |

## Usage

```yaml
- uses: owner/repo@v1
  with:
    action-yml: ''
    readme-md: ''
    update: ''
```
<!-- END_ACTION_DOCS -->

---

## 🔐 Level Up Your Security
Grab the **[GitHub Actions Security Checklist](https://trivexia.gumroad.com/l/bfsbud)** — 50+ battle-tested checks covering secrets management, supply chain attacks, permission scoping, and runner hardening.

---

## 🧠 Stop CI Debugging Hell
Grab the **[CI Failure Recovery Pack](https://trivexia.gumroad.com/l/ci-failure-recovery-pack)** — includes the **GitHub Actions Triage Checklist** and the **CI Debugging Template** to help you find and fix root causes systematically.

---

Built by [Revenue Builder](https://github.com/ollieb89/revenue-builder)
