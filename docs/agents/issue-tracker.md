# Issue tracker: ClickUp

Issues and specs for this repo live as ClickUp tasks. Use the `clickup` CLI wrapper (the `ops:clickup` skill) for all operations.

- **Account**: `zelogic` (every command starts with `clickup zelogic ...`). Never pass `--token` or `--workspace`.
- **Workspace**: Zelogic (`90122085480`)
- **Space**: Dev Tools (`901210937944`). Tags live at space level.
- **List**: Devkit (`901223321731`)
- **Statuses**: `to do` / `in progress` / `complete`

## Writes are live

The token has the owner's full rights. Confirm with the user before any create, update, comment, tag change, dependency change or close.

## Conventions

- **Create an issue**: `clickup zelogic task create --list 901223321731 --name "..." --description @/path/to/body.txt`. Descriptions are plain text: markdown shows as literal characters.
- **Read an issue**: `clickup zelogic task get <id> --markdown --output json | jq '.[0] | {id, name, status: .status.status, tags: [.tags[].name], parent, markdown_description}'`, plus `clickup zelogic comment list --task <id> --output json` for comments.
- **List issues**: `clickup zelogic task list --list 901223321731 --output json | jq -c '.[] | {id, name, status: .status.status, tags: [.tags[].name], parent}'`. Filter with `--tag <tag>` or `--status <status>`. Add `--include-closed` for closed tasks and `--subtasks` for subtasks. Add `--all` to get every page.
- **Make an issue a sub-issue of a parent**: `task create --list 901223321731 --parent <parent-id> ...`. Epic = parent task, ticket = subtask in the same list.
- **Comment on an issue**: `clickup zelogic comment create --task <id> --text @/path/to/comment.md --markdown`
- **Apply / remove labels**: `clickup zelogic task add-tag <id> <tag>` / `clickup zelogic task remove-tag <id> <tag>`
- **Close**: comment with the reason, then `clickup zelogic task update <id> --status complete`

Always pass the task ID. An unknown task ID gives `401 Team not authorized`, not 404.

## Pull requests as a triage surface

Not used. PRs on GitHub are not triaged through this tracker.

## When a skill says "publish to the issue tracker"

Create a ClickUp task in the Devkit list.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single parent task with **child** subtasks as tickets.

- **Map**: a task in the Devkit list tagged `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body.
- **Child ticket**: a subtask of the map (`task create --parent <map-id>`). Tags: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: ClickUp task dependencies. `clickup zelogic task add-dep <child-id> --depends-on <blocker-id>`. A ticket is unblocked when every blocker is `complete`.
- **Frontier query**: list the map's open subtasks (`task list --list 901223321731 --subtasks`, keep those whose `parent` is the map), drop any with an open blocker (read `dependencies` from `task get`) or an assignee; first in map order wins.
- **Claim**: `clickup zelogic task update <id> --assignee <my-user-id>` (get the ID from `clickup zelogic auth whoami`), the session's first write.
- **Resolve**: comment the answer, set status `complete`, then append a context pointer (gist + task link) to the map's Decisions-so-far.
