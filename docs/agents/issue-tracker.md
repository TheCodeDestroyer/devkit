---
tracker: clickup
clickup-account: zelogic
clickup-space: 901210937944
clickup-lists: 901223321731
---

# Issue tracker: ClickUp

Issues for this repo live in ClickUp, workspace "Zelogic", space **Dev Tools**.
Not in GitHub Issues, not in beads, not as markdown files. Every
skill that reads or writes "the issue tracker" uses the `clickup zelogic ...`
wrapper (the `ops:clickup` skill; account notes in
`~/.config/ops/accounts/zelogic.md`).

Do not create `.scratch/` issue files or a combined tickets markdown file.

All Devkit work (features, bugs, chores) goes in the space's `Devkit` list.
Find list IDs with `clickup zelogic list list --space 901210937944`. Priority:
1=urgent, 2=high, 3=normal, 4=low.

## Writes are live

The token has the owner's full rights. Confirm with the user before any create, update, comment, tag change, dependency change or close.

Always pass the task ID. An unknown task ID gives `401 Team not authorized`, not 404.

## Pull requests as a triage surface

Not used. PRs on GitHub are not triaged through this tracker.

## When a skill says "publish to the issue tracker"

    clickup zelogic task create --list <devkit-list-id> --name "<summary>" \
      --description @/path/to/body.txt --priority 3 --assignee <your-user-id>

Get `<your-user-id>` from `clickup zelogic auth whoami`.

- Descriptions are plain text (no markdown). Put acceptance criteria and design
  notes in the body under plain headings.
- Hierarchy: an epic is a parent task; tickets are subtasks via
  `--parent <task-id>`. A subtask must be created in its parent's list.
- Ordering constraints:
  `clickup zelogic task add-dep <task> --depends-on <blocker>`.
- Triage labels are tags: `--tag <name>` at create, or
  `clickup zelogic task add-tag <task> <name>`. See `triage-labels.md`.
- Creates are live writes in a shared workspace: confirm with the user first.

## When a skill says "fetch the relevant ticket"

    clickup-prime
    clickup zelogic task get <task-id> --markdown --output json
    clickup zelogic comment list --task <task-id> --output json

## Updating and closing

Follow the status flow in the `ops:clickup` skill ("Task status through a PR"),
with the status order `clickup-prime` prints:

    clickup zelogic task update <task-id> --status "<status>"

- Note progress or a decision:
  `clickup zelogic comment create --task <task-id> --text "..." --markdown`

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single parent task with **child** subtasks as tickets.

- **Map**: a task in the `Devkit` list tagged `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body.
- **Child ticket**: a subtask of the map (`task create --parent <map-id>`). Tags: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: ClickUp task dependencies. `clickup zelogic task add-dep <child-id> --depends-on <blocker-id>`. A ticket is unblocked when every blocker is `closed`.
- **Frontier query**: list the map's subtasks with status type `open` (`task list --list <devkit-list-id> --subtasks`, keep those whose `parent` is the map), drop any with an open blocker (read `dependencies` from `task get`) or an assignee; first in map order wins.
- **Claim**: `clickup zelogic task update <id> --assignee <your-user-id>` (get the ID from `clickup zelogic auth whoami`), the session's first write.
- **Resolve**: comment the answer, set the `closed` status, then append a context pointer (gist + task link) to the map's Decisions-so-far.
