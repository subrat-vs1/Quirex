# Git Complete Command Reference Guide (Hinglish)

> **Kaise use karein yeh guide?**  
> `Ctrl+F` se koi bhi command, situation ya keyword search karo.  
> Har entry mein command, explanation, example aur warnings ek hi jagah hain.  
> Yeh file tumhara **permanent Git encyclopedia** hai — kabhi bhi, kuch bhi dhundho.

---

## 📋 Table of Contents

1. [Initial Setup & Configuration](#1-initial-setup--configuration)
2. [Repository Creation & Cloning](#2-repository-creation--cloning)
3. [Staging & Commits](#3-staging--commits)
4. [Branching](#4-branching)
5. [Remote Management](#5-remote-management)
6. [Pushing & Pulling](#6-pushing--pulling)
7. [Viewing History & Logs](#7-viewing-history--logs)
8. [Merging](#8-merging)
9. [Rebasing](#9-rebasing)
10. [Tagging](#10-tagging)
11. [Stashing](#11-stashing)
12. [Undoing & Rewriting History](#12-undoing--rewriting-history)
13. [Diff & Comparison](#13-diff--comparison)
14. [Ignoring Files](#14-ignoring-files)
15. [Submodules](#15-submodules)
16. [Advanced & Lesser-Known Commands](#16-advanced--lesser-known-commands)
17. [Git Mishaps & Recovery (Situation-Based)](#17-git-mishaps--recovery-situation-based)
18. [Command Combinations & Workflows](#18-command-combinations--workflows)

---

## 1. Initial Setup & Configuration

> **Config kya hoti hai?**  
> Git ko pehli baar use karne se pehle tum apna naam, email aur settings bataate ho. Yeh settings teen levels par ho sakti hain:
> - **`--system`**: Poore computer ke liye (sabhi users)
> - **`--global`**: Sirf tumhare user account ke liye (sabse common)
> - **`--local`**: Sirf is specific project/repo ke liye

---

### `git config --global user.name`

```bash
git config --global user.name "Rahul Sharma"
```

**Kya karta hai:** Git ko batata hai ki commits kaun kar raha hai — tumhara naam.  
**Kab use karein:** Git install karne ke baad ek baar. Yeh naam har commit ke saath save hota hai.  
**Real example:** `git config --global user.name "Rahul Sharma"`  
**Warning:** Naam mein space ho to double quotes zaroori hain.

---

### `git config --global user.email`

```bash
git config --global user.email "rahul@example.com"
```

**Kya karta hai:** Git commits ke saath tumhara email associate karta hai.  
**Kab use karein:** GitHub/GitLab account se same email use karo taaki contributions properly credit hon.  
**Real example:** `git config --global user.email "rahul@example.com"`  
**Warning:** Galat email se GitHub par tumhari commits unlinked rahenge.

---

### `git config --global core.editor`

```bash
# VS Code
git config --global core.editor "code --wait"

# Vim
git config --global core.editor "vim"

# Nano
git config --global core.editor "nano"

# Notepad (Windows)
git config --global core.editor "notepad"
```

**Kya karta hai:** Default text editor set karta hai jo `git commit` (bina `-m` ke) ya `git rebase -i` mein use hoga.  
**Kab use karein:** Jab tum long commit messages likhna chahte ho ya interactive rebase karna ho.  
**Warning:** `code --wait` mein `--wait` flag zaroori hai — iske bina VS Code immediately close ho jaata hai aur Git confused ho jaata hai.

---

### `git config --global core.autocrlf`

```bash
# Windows users ke liye
git config --global core.autocrlf true

# Mac/Linux users ke liye
git config --global core.autocrlf input

# Band karna (advanced)
git config --global core.autocrlf false
```

**Kya karta hai:** Line endings handle karta hai. Windows `\r\n` use karta hai, Mac/Linux `\n` — yeh conflicts avoid karta hai.  
**Kab use karein:** Windows pe `true`, Mac/Linux pe `input` set karo.  
**Warning:** Team mein sabki setting alag ho to files unnecessarily "changed" dikhenge diffs mein.

---

### `git config --global core.excludesfile`

```bash
git config --global core.excludesfile ~/.gitignore_global
```

**Kya karta hai:** Ek global `.gitignore` file set karta hai jo har repo mein apply hoti hai.  
**Kab use karein:** OS-specific files (`.DS_Store`, `Thumbs.db`) ya IDE files (`.idea/`, `.vscode/`) globally ignore karne ke liye.  
**Real example:** `echo ".DS_Store" >> ~/.gitignore_global`

---

### `git config --global merge.tool`

```bash
git config --global merge.tool vimdiff
git config --global merge.tool vscode
```

**Kya karta hai:** Merge conflicts resolve karne ka tool set karta hai.  
**Kab use karein:** `git mergetool` command ke saath use hota hai conflicts ko visually resolve karne ke liye.

---

### `git config --global pull.rebase`

```bash
# Pull ke saath rebase karo (recommended)
git config --global pull.rebase true

# Pull ke saath merge karo (default)
git config --global pull.rebase false
```

**Kya karta hai:** `git pull` ka default behavior set karta hai.  
**Warning:** `pull.rebase false` ke saath har `git pull` ek unnecessary merge commit create kar sakta hai.

---

### `git config --global init.defaultBranch`

```bash
git config --global init.defaultBranch main
```

**Kya karta hai:** Naye repos ki default branch ka naam set karta hai (`master` ke bajaaye `main`).  
**Kab use karein:** Modern convention `main` use karta hai.

---

### `git config --global alias`

```bash
# Short aliases banana
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.lg "log --oneline --graph --decorate --all"
git config --global alias.last "log -1 HEAD"
git config --global alias.unstage "reset HEAD --"
```

**Kya karta hai:** Custom shortcuts banata hai long commands ke liye.  
**Use karo:** `git st` (git status ke bajaaye), `git lg` (fancy log ke liye)

---

### Config check karna

```bash
# Saari settings dekhna
git config --list

# Global settings dekhna
git config --global --list

# Specific setting dekhna
git config user.name
git config user.email

# Kahan se aa rahi hai yeh setting
git config --show-origin user.name

# Config file directly edit karna
git config --global --edit
```

---

### SSH Key Setup

```bash
# SSH key generate karna
ssh-keygen -t ed25519 -C "rahul@example.com"

# SSH agent start karna
eval "$(ssh-agent -s)"

# Key add karna agent mein
ssh-add ~/.ssh/id_ed25519

# Public key copy karna (GitHub mein paste karo)
cat ~/.ssh/id_ed25519.pub

# Test karna ki SSH kaam kar raha hai
ssh -T git@github.com
```

**Kab use karein:** HTTPS se baar baar password daalne ki jagah SSH se password-free push/pull karo.

---

## 2. Repository Creation & Cloning

### `git init`

```bash
# Current folder mein repo banana
git init

# Nayi folder bana ke repo banana
git init my-project

# Bare repo banana (servers ke liye)
git init --bare repo.git
```

**Kya karta hai:** Ek naya Git repository shuru karta hai — `.git` folder create karta hai.  
**Kab use karein:** Kisi naye project ko Git ke saath track karna shuru karna ho.  
**Warning:** `git init` already existing `.git` folder wale folder mein mat karo — double initialization hogi.

---

### `git clone`

```bash
# Basic clone
git clone https://github.com/user/repo.git

# Custom folder naam ke saath
git clone https://github.com/user/repo.git my-folder

# Specific branch clone karna
git clone -b develop https://github.com/user/repo.git

# Shallow clone (sirf last N commits)
git clone --depth=1 https://github.com/user/repo.git

# SSH se clone
git clone git@github.com:user/repo.git

# Submodules ke saath clone
git clone --recurse-submodules https://github.com/user/repo.git
```

**Kya karta hai:** Kisi existing remote repository ki puri copy local machine par download karta hai.  
**Kab use karein:** Kisi project par kaam shuru karna ho jo GitHub/GitLab par already hai.  
**Warning:** Bada repo clone karne mein time lag sakta hai — `--depth=1` se fast shallow clone hoti hai.

---

## 3. Staging & Commits

> **Staging area kya hai?** — Git mein 3 zones hote hain:
> 1. **Working directory**: Tumhari actual files jahan tum changes karte ho
> 2. **Staging area (Index)**: Woh changes jo next commit mein jaayenge (`git add` se yahan aate hain)
> 3. **Repository**: Committed history

### `git add`

```bash
# Ek file add karna
git add filename.txt

# Multiple files add karna
git add file1.txt file2.txt

# Poori current directory add karna
git add .

# Saare tracked files ke changes add karna (new files nahi)
git add -u

# Saari changes add karna (new + modified + deleted)
git add -A

# Interactive staging (chunk by chunk)
git add -p
git add --patch

# Specific folder add karna
git add src/

# Wildcard se add karna
git add *.js
```

**Kya karta hai:** Files ko staging area mein daalta hai — matlab next commit ke liye prepare karta hai.  
**`-p` flag:** Ek file ke andar specific changes (hunks) selectively add karne ke liye — bahut powerful!  
**Warning:** `git add .` se koi bhi unwanted file (passwords, large files) accidentally stage ho sakti hai. `git status` pehle check karo.

---

### `git commit`

```bash
# Message ke saath commit
git commit -m "Add login feature"

# Multi-line message
git commit -m "Add login feature" -m "Handles Google OAuth and email/password login"

# Staged aur modified tracked files ek saath commit (add + commit)
git commit -am "Fix typo in header"

# Editor mein message likhna
git commit

# Last commit amend karna (message ya files change karna)
git commit --amend -m "New correct message"

# Author change karke amend
git commit --amend --author="Rahul <rahul@example.com>"

# Empty commit (CI trigger karne ke liye)
git commit --allow-empty -m "Trigger CI"

# Commit aur sign off
git commit -s -m "Add feature"
```

**Kya karta hai:** Staged changes ko permanently repository mein save karta hai.  
**`-am` flag:** Sirf already-tracked files ke liye kaam karta hai — naye files ko pehle `git add` karna padega.  
**Warning:** `--amend` sirf last commit ke liye hai. Push ho chuki commits ko amend mat karo (history rewrite hoti hai).

---

### `git status`

```bash
# Full status
git status

# Short/compact format
git status -s
git status --short

# Branch info ke saath
git status -sb
```

**Kya karta hai:** Current working tree ka state dikhata hai — kaun si files staged hain, modified hain, ya untracked hain.  
**Har kaam se pehle:** `git status` run karo — yeh tumhara best friend hai.

---

### `git rm`

```bash
# File delete karna aur stage karna
git rm filename.txt

# Sirf staging se hatana (file disk par rehti hai)
git rm --cached filename.txt

# Force remove
git rm -f filename.txt

# Folder remove karna
git rm -r folder/
```

**Kya karta hai:** Files ko Git tracking se remove karta hai.  
**`--cached`:** File disk par rehti hai but Git isse track karna band kar deta hai (`.gitignore` mein daalne se pehle useful).

---

## 4. Branching

> **Branch kya hai?** — Ek alag "line of work" jo main code se alag hoti hai. Isme features develop karo, phir merge karo.

### `git branch`

```bash
# Saari local branches dekhna
git branch

# Local aur remote dono dekhna
git branch -a

# Sirf remote branches dekhna
git branch -r

# Nayi branch banana (switch nahi hoti)
git branch feature-login

# Branch delete karna (merged honi chahiye)
git branch -d feature-login

# Branch force delete karna (unmerged bhi)
git branch -D feature-login

# Branch rename karna
git branch -m old-name new-name

# Current branch rename karna
git branch -m new-name

# Branch ko new upstream set karna
git branch -u origin/main

# Last commit message ke saath branches dekhna
git branch -v

# Merged branches dekhna
git branch --merged

# Unmerged branches dekhna
git branch --no-merged
```

---

### `git checkout`

```bash
# Branch par switch karna
git checkout feature-login

# Nayi branch banana aur switch karna
git checkout -b feature-login

# Remote branch ko locally checkout karna
git checkout -b feature origin/feature

# Specific commit par jaana (detached HEAD)
git checkout abc1234

# File ki working copy restore karna (last commit se)
git checkout -- filename.txt

# Specific commit se file restore karna
git checkout abc1234 -- filename.txt

# Previous branch par wapas jaana
git checkout -
```

**Warning:** `git checkout -- filename.txt` se file ki unsaved changes permanently delete ho jaati hain — undo nahi hota!

---

### `git switch` (Modern alternative to checkout)

```bash
# Branch switch karna
git switch feature-login

# Nayi branch banana aur switch karna
git switch -c feature-login

# Remote branch track karna
git switch --track origin/feature

# Previous branch par
git switch -
```

**Note:** Git 2.23+ mein `git switch` aur `git restore` ne `git checkout` ke kuch kaam le liye — zyada clear commands hain.

---

### `git restore` (Modern alternative)

```bash
# Working directory mein file restore karna (staged changes discard)
git restore filename.txt

# Staged file unstage karna
git restore --staged filename.txt

# Specific commit se restore karna
git restore --source=abc1234 filename.txt
```

---

## 5. Remote Management

> **Remote kya hai?** — GitHub, GitLab ya koi aur server jahan tumhara code online store hota hai. Normally "origin" naam se jaana jaata hai.

### `git remote`

```bash
# Saare remotes dekhna
git remote

# URLs ke saath dekhna
git remote -v

# Remote add karna
git remote add origin https://github.com/user/repo.git

# Remote ka URL change karna
git remote set-url origin https://github.com/user/new-repo.git

# Remote rename karna
git remote rename origin upstream

# Remote remove karna
git remote remove origin

# Remote ki detailed info
git remote show origin
```

---

### Multiple Remotes Setup

```bash
# Fork workflow ke liye
git remote add origin https://github.com/MY-USER/repo.git
git remote add upstream https://github.com/ORIGINAL-USER/repo.git

# Upstream se sync karna
git fetch upstream
git merge upstream/main
```

---

## 6. Pushing & Pulling

### `git fetch`

```bash
# Saare remotes se fetch karna (download only, merge nahi)
git fetch

# Specific remote se
git fetch origin

# Specific branch fetch karna
git fetch origin main

# Saari remotes se
git fetch --all

# Tags bhi fetch karna
git fetch --tags

# Deleted remote branches ko locally bhi delete karna
git fetch --prune
git fetch -p
```

**Kya karta hai:** Remote se changes download karta hai but tumhari local branch merge nahi karta.  
**Kab use karein:** Pehle dekhna chahte ho kya changes hain before merging.

---

### `git pull`

```bash
# Default pull (fetch + merge)
git pull

# Specific remote aur branch se pull
git pull origin main

# Rebase ke saath pull (cleaner history)
git pull --rebase
git pull --rebase origin main

# Fast-forward only (merge commit nahi banana)
git pull --ff-only

# Squash karke pull
git pull --squash
```

**Kya karta hai:** Remote se changes fetch karta hai aur tumhari current branch mein merge karta hai.  
**Warning:** `git pull` se unexpected merge conflicts aa sakte hain. Pehle `git fetch` aur `git log origin/main` check karo.

---

### `git push`

```bash
# Current branch push karna
git push

# Specific remote aur branch push karna
git push origin main

# Pehli baar push karna aur upstream set karna
git push -u origin feature-login
git push --set-upstream origin feature-login

# Force push (DANGEROUS!)
git push --force
git push -f

# Safer force push
git push --force-with-lease

# Tags push karna
git push --tags
git push origin v1.0

# Branch delete karna remote par
git push origin --delete feature-old
git push origin :feature-old

# Saari branches push karna
git push --all origin

# Dry run (kya hoga check karo bina push kiye)
git push --dry-run
```

**`--force-with-lease`:** Regular `--force` se safer hai — agar kisi ne already push kiya hai to fail ho jaata hai.  
**Warning:** `git push --force` shared branches par KABHI mat karo — teammates ka work overwrite ho sakta hai!

---

## 7. Viewing History & Logs

### `git log`

```bash
# Basic log
git log

# One line per commit
git log --oneline

# Fancy graph with branches
git log --oneline --graph --decorate --all

# Last N commits
git log -5
git log -n 10

# Specific author ke commits
git log --author="Rahul"

# Date range
git log --since="2024-01-01" --until="2024-12-31"
git log --after="2 weeks ago"

# Specific file ke commits
git log -- filename.txt

# Commit message search
git log --grep="login"
git log --grep="fix" -i   # case insensitive

# Changed content search (kaun se commit ne yeh text add/remove kiya)
git log -S "function login"
git log -G "regex pattern"

# Diff ke saath log
git log -p
git log --patch

# Stats ke saath (kaun si files kitni lines change hui)
git log --stat

# Custom format
git log --pretty=format:"%h %an %s %ar"
# %h = short hash, %an = author name, %s = subject, %ar = relative time

# Merge commits dekhna
git log --merges

# Merge commits hide karna
git log --no-merges

# Between two branches
git log main..feature-login

# Specific commit range
git log abc1234..def5678
```

---

### `git show`

```bash
# Last commit ki details aur diff
git show

# Specific commit dekhna
git show abc1234

# Sirf commit info (diff nahi)
git show abc1234 --stat

# Specific file ka diff uss commit mein
git show abc1234:filename.txt

# Tag dekhna
git show v1.0
```

---

### `git blame`

```bash
# Har line kaun ne likhi
git blame filename.txt

# Line range ke saath
git blame -L 10,20 filename.txt

# Short format
git blame -s filename.txt

# Email ke saath
git blame -e filename.txt

# Whitespace changes ignore karke
git blame -w filename.txt
```

**Kya karta hai:** Har line ke saath dikhata hai kaun ne, kab, kis commit mein wo line likhi.  
**Use:** Bug dhundhne ke liye bahut helpful hai — "yeh code kisne likha?"

---

### `git reflog`

```bash
# Saari recent HEAD movements
git reflog

# Specific branch ka reflog
git reflog show main

# Last N entries
git reflog -5

# Date ke saath
git reflog --date=iso
```

**Kya karta hai:** Tumhare local repo mein har movement track karta hai — commits, merges, resets sab.  
**Superpower:** Deleted commits bhi yahan dikhte hain — recovery ka tool!

---

## 8. Merging

> **Merge kya hai?** — Ek branch ke changes doosri branch mein combine karna.

### `git merge`

```bash
# Feature branch ko current branch mein merge karna
git merge feature-login

# Merge commit banana (even if fast-forward possible)
git merge --no-ff feature-login

# Fast-forward only (merge commit nahi)
git merge --ff-only feature-login

# Squash: saare commits ek mein combine karo (commit nahi hota auto)
git merge --squash feature-login

# Merge abort karna (conflict ke baad)
git merge --abort

# Merge continue karna (conflict resolve karne ke baad)
git merge --continue

# Custom message ke saath merge
git merge feature-login -m "Merge feature-login into main"
```

**Fast-forward:** Jab main branch mein koi naya commit nahi hota feature branch ke baad, Git simply pointer move kar deta hai.  
**`--no-ff`:** Hamesha merge commit banata hai — history mein clearly dikhta hai ki yeh feature kab merge hua.

---

### Merge Conflict Handle Karna

```bash
# Step 1: Merge karo (conflict aaya)
git merge feature-login

# Step 2: Kaun si files conflict mein hain?
git status

# Step 3: File kholo aur resolve karo
# Conflict markers dikhenge:
# <<<<<<< HEAD
# (current branch ka code)
# =======
# (merging branch ka code)
# >>>>>>> feature-login

# Step 4: Mergetool use karna
git mergetool

# Step 5: Resolved files add karo
git add filename.txt

# Step 6: Merge complete karo
git merge --continue
# Ya
git commit

# Agar merge abort karna ho
git merge --abort
```

---

## 9. Rebasing

> **Rebase kya hai?** — Tumhare commits ko ek nayi base par replay karna. History cleaner dikhti hai but history rewrite hoti hai.

### `git rebase`

```bash
# Current branch ko main ke upar rebase karna
git rebase main

# Specific branch par rebase
git rebase origin/main

# Interactive rebase (last N commits edit karna)
git rebase -i HEAD~3
git rebase -i HEAD~5

# Rebase continue karna (conflict resolve karne ke baad)
git rebase --continue

# Rebase skip karna (current commit skip)
git rebase --skip

# Rebase abort karna
git rebase --abort

# Onto flag: branch ko doosri base par move karna
git rebase --onto new-base old-base branch
```

**Interactive Rebase Commands (`-i`):**
```
pick   = commit rakhna as-is
reword = commit rakhna but message change karna
edit   = commit rakhna but changes karne deta hai
squash = previous commit mein merge karna (message combine)
fixup  = squash but message discard karna
drop   = commit delete karna
```

**Warning:** Public/shared branches rebase mat karo — dusron ka history break ho jaata hai!

---

## 10. Tagging

> **Tag kya hai?** — Ek specific commit ka permanent label — usually version releases ke liye.

### `git tag`

```bash
# Saare tags dekhna
git tag

# Pattern se tags dekhna
git tag -l "v1.*"

# Lightweight tag banana (sirf pointer)
git tag v1.0

# Annotated tag banana (recommended — message, author, date)
git tag -a v1.0 -m "Version 1.0 release"

# Specific commit par tag lagana
git tag -a v1.0 abc1234 -m "Version 1.0"

# Tag dekhna
git show v1.0

# Tag push karna
git push origin v1.0

# Saare tags push karna
git push origin --tags

# Tag delete karna locally
git tag -d v1.0

# Tag delete karna remote par
git push origin --delete v1.0
git push origin :refs/tags/v1.0

# Tag pe checkout karna (detached HEAD)
git checkout v1.0
```

---

## 11. Stashing

> **Stash kya hai?** — Incomplete work ko temporarily side mein rakhna bina commit kiye — jaise ek "drawer" mein daalna.

### `git stash`

```bash
# Current changes stash karna
git stash

# Message ke saath stash
git stash save "WIP: login form validation"
# Ya (modern syntax)
git stash push -m "WIP: login form validation"

# Untracked files bhi include karna
git stash -u
git stash --include-untracked

# Ignored files bhi include karna
git stash -a
git stash --all

# Saare stashes dekhna
git stash list

# Stash apply karna (stash hata nahi)
git stash apply
git stash apply stash@{2}  # specific stash

# Stash apply karna aur hata dena
git stash pop
git stash pop stash@{2}

# Stash ki diff dekhna
git stash show
git stash show -p   # full diff

# Specific stash delete karna
git stash drop stash@{0}

# Saare stashes delete karna
git stash clear

# Stash se nayi branch banana
git stash branch new-feature stash@{0}

# Partial stash (sirf kuch files)
git stash push -m "partial" -- file1.txt file2.txt
```

---

## 12. Undoing & Rewriting History

> **Yeh section bahut important hai!** — Mistakes fix karne ke liye.

### `git reset`

```bash
# Staged files unstage karna (working directory safe)
git reset HEAD filename.txt
git reset filename.txt

# Soft reset: commits undo karo, changes staged rehte hain
git reset --soft HEAD~1
git reset --soft HEAD~3   # 3 commits peeche

# Mixed reset (default): commits undo karo, changes unstaged ho jaate hain
git reset HEAD~1
git reset --mixed HEAD~1

# Hard reset: commits aur changes dono permanently delete (DANGEROUS!)
git reset --hard HEAD~1
git reset --hard HEAD~3

# Specific commit tak reset karna
git reset --hard abc1234

# Remote ke barabar karna (local changes discard)
git reset --hard origin/main
```

**Reset types summary:**
| Type | Commits | Staging Area | Working Directory |
|------|---------|--------------|-------------------|
| `--soft` | Undo | Changes staged rehte | Untouched |
| `--mixed` | Undo | Staged changes unstaged hote | Untouched |
| `--hard` | Undo | Cleared | **Cleared (PERMANENT)** |

**Warning:** `git reset --hard` se working directory changes permanently delete hote hain — undo nahi hota!

---

### `git revert`

```bash
# Commit ko undo karna (nayi "undo" commit banata hai — safe for public history)
git revert abc1234

# Message ke saath
git revert abc1234 -m "Revert: remove broken feature"

# Multiple commits revert karna
git revert abc1234 def5678

# Commit nahi banana abhi (sirf changes stage karo)
git revert --no-commit abc1234

# Merge commit revert karna
git revert -m 1 merge-commit-hash
```

**Kab use karein:** Pushed commits ko undo karne ke liye — history preserve karta hai, safe hai.

---

### `git cherry-pick`

```bash
# Specific commit apply karna current branch par
git cherry-pick abc1234

# Multiple commits
git cherry-pick abc1234 def5678

# Range of commits
git cherry-pick abc1234..def5678

# Commit nahi banana (sirf changes apply karo)
git cherry-pick --no-commit abc1234

# Author preserve karna
git cherry-pick -x abc1234   # "(cherry picked from commit...)" message add karta hai

# Conflict ke baad continue
git cherry-pick --continue

# Abort
git cherry-pick --abort
```

---

### `git clean`

```bash
# Kya delete hoga preview (dry run)
git clean -n

# Untracked files delete karna
git clean -f

# Untracked directories bhi delete karna
git clean -fd

# Ignored files bhi delete karna
git clean -fx

# Sab kuch (untracked + ignored + directories)
git clean -fxd

# Interactive mode
git clean -i
```

**Warning:** `git clean -fd` se files permanently delete hoti hain — undo nahi hota!

---

## 13. Diff & Comparison

### `git diff`

```bash
# Unstaged changes dekhna (working directory vs staging)
git diff

# Staged changes dekhna (staging vs last commit)
git diff --staged
git diff --cached

# Working directory vs last commit
git diff HEAD

# Specific file ka diff
git diff filename.txt

# Do branches compare karna
git diff main feature-login

# Do commits compare karna
git diff abc1234 def5678

# Sirf file names dekhna (full diff nahi)
git diff --name-only

# Statistics ke saath
git diff --stat

# Word-level diff
git diff --word-diff

# Color output
git diff --color-words
```

---

## 14. Ignoring Files

### `.gitignore`

```bash
# .gitignore file banana
touch .gitignore
```

**.gitignore patterns:**
```gitignore
# Comments
# -------

# Specific file ignore
secret.txt
.env

# Specific extension
*.log
*.tmp

# Specific folder
node_modules/
dist/
.vscode/
.idea/

# Root level only (not subdirectories)
/config.local.js

# All files in any "build" folder
**/build/

# Negation (exception banana)
!important.log

# OS files
.DS_Store       # Mac
Thumbs.db       # Windows
desktop.ini     # Windows
```

```bash
# Already tracked file ko untrack karna
git rm --cached filename.txt
git rm --cached -r folder/

# .gitignore check karna
git check-ignore -v filename.txt

# Kya ignore ho raha hai dekhna
git status --ignored
```

**Warning:** `.gitignore` sirf untracked files pe kaam karta hai. Agar file already tracked hai to pehle `git rm --cached` karo.

---

## 15. Submodules

> **Submodule kya hai?** — Ek repo ke andar doosra repo. Library code ko separate track karne ke liye.

```bash
# Submodule add karna
git submodule add https://github.com/user/library.git libs/library

# Submodules initialize karna (clone ke baad)
git submodule init
git submodule update

# Ek command mein
git submodule update --init --recursive

# Saare submodules pull karna
git submodule update --remote

# Status dekhna
git submodule status

# Submodule remove karna
git submodule deinit libs/library
git rm libs/library
```

---

## 16. Advanced & Lesser-Known Commands

### `git bisect` — Bug dhundna (Binary Search)

```bash
# Start karna
git bisect start

# Current commit broken hai
git bisect bad

# Yeh commit theek tha
git bisect good v1.0

# Git automatically middle commit checkout karega
# Test karo, phir batao:
git bisect good   # agar theek hai
git bisect bad    # agar broken hai

# Jab bug commit dhundh lo
git bisect reset   # normal state pe wapas

# Automated bisect (test script ke saath)
git bisect run npm test
```

---

### `git worktree` — Multiple Working Directories

```bash
# Nayi branch ke liye alag folder banana
git worktree add ../hotfix-branch hotfix

# Existing branch checkout karna
git worktree add ../main-work main

# Saare worktrees dekhna
git worktree list

# Worktree remove karna
git worktree remove ../hotfix-branch
```

---

### `git archive` — Export without .git

```bash
# ZIP export
git archive --format=zip HEAD > project.zip

# Specific branch export
git archive --format=tar main | gzip > main.tar.gz

# Specific folder export
git archive HEAD src/ > src.zip
```

---

### `git shortlog` — Contributor Summary

```bash
git shortlog
git shortlog -sn   # sorted by number of commits
git shortlog -sne  # with email
```

---

### `git describe` — Nearest Tag se Description

```bash
git describe              # nearest tag + commits since + hash
git describe --tags       # lightweight tags bhi include
git describe --always     # koi tag nahi hai to hash dikhao
```

---

### `git grep` — Code Search

```bash
git grep "function login"
git grep -n "TODO"       # line numbers ke saath
git grep -i "error"      # case insensitive
git grep "pattern" HEAD  # specific commit mein
git grep "pattern" -- "*.js"  # specific files mein
```

---

### `git notes` — Commits par Notes

```bash
git notes add -m "Code review needed" abc1234
git notes show abc1234
git notes remove abc1234
```

---

### `git bundle` — Offline Transfer

```bash
# Complete repo bundle banana
git bundle create repo.bundle HEAD main

# Bundle se clone karna
git clone repo.bundle
```

---

### `git filter-branch` / `git filter-repo` — History Rewrite (Advanced)

```bash
# Sensitive file poori history se remove karna (filter-repo recommended)
# Pehle install karo: pip install git-filter-repo

git filter-repo --path secret.txt --invert-paths
git filter-repo --path-glob "*.pem" --invert-paths
```

**Warning:** History rewrite karne ke baad sabko `git clone` fresh karna padega. VERY DESTRUCTIVE.

---

### `git ls-files`

```bash
# Tracked files list
git ls-files

# Staged files
git ls-files --stage

# Deleted files
git ls-files --deleted
```

---

### `git cat-file` — Git Objects Inspect

```bash
git cat-file -t abc1234   # object type
git cat-file -p abc1234   # object content
```

---

### `git rerere` — Reuse Recorded Resolution

```bash
# Enable karna
git config --global rerere.enabled true

# Saved resolutions dekhna
git rerere diff
```

**Kya karta hai:** Merge conflicts ke solutions yaad rakhta hai — same conflict dobara aane par auto-resolve karta hai.

---

## 17. Git Mishaps & Recovery (Situation-Based)

---

### 🔴 Situation 1: Galat Branch Par Commit Ho Gaya

**Problem:** `main` par commit kar diya jab `feature` par karna tha.

```bash
# Step 1: Commit hash note karo
git log --oneline -3

# Step 2: Nayi/sahi branch banana (ya switch karna)
git checkout -b feature-login
# Ya existing branch par
git checkout feature-login

# Step 3: Cherry-pick woh commit
git cherry-pick abc1234   # galat branch se

# Step 4: Galat branch (main) par wapas jaao aur commit undo karo
git checkout main
git reset --hard HEAD~1   # last commit hata do
```

---

### 🔴 Situation 2: Commit Message Galat Likhi

**Problem:** Last commit ka message typo/galat hai.

```bash
# Agar commit push nahi hua
git commit --amend -m "Correct commit message here"

# Agar push ho chuka hai (force push zaroori hoga — shared branch par mat karo)
git commit --amend -m "Correct message"
git push --force-with-lease origin feature-branch
```

---

### 🔴 Situation 3: Galat Files Commit Ho Gayi (Password, Secret File)

**Problem:** `.env` ya koi secret file commit ho gayi.

```bash
# Agar abhi push nahi hua
git reset --soft HEAD~1   # commit undo, files staged rehti hain
git restore --staged .env   # .env unstage karo
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"

# Agar push ho chuka hai — history se poori tarah hatana
# git-filter-repo use karo
git filter-repo --path .env --invert-paths --force
git push --force origin main

# IMPORTANT: Secret credentials IMMEDIATELY rotate/change karo!
```

**Warning:** Agar sensitive data push ho chuka hai to assume karo ki compromise ho gaya — passwords IMMEDIATELY change karo!

---

### 🔴 Situation 4: Last Commit Undo Karna (Before Push)

```bash
# Changes staged rakhte hue commit undo (--soft)
git reset --soft HEAD~1

# Changes unstaged karte hue commit undo (--mixed, default)
git reset HEAD~1

# Changes bhi delete karte hue commit undo (--hard, PERMANENT)
git reset --hard HEAD~1
```

---

### 🔴 Situation 5: Pushed Commit Undo Karna (After Push)

```bash
# Safe approach: Revert commit (history preserve hoti hai)
git revert abc1234
git push origin main

# Agar multiple commits revert karne hain
git revert HEAD~3..HEAD   # last 3 commits revert
git push origin main
```

---

### 🔴 Situation 6: Merge Conflict Resolve Karna

```bash
# Step 1: Merge karo
git merge feature-branch

# Step 2: Conflict files dekhna
git status

# Step 3: Har conflicted file ko manually edit karo
# <<<<< HEAD ... ===== ... >>>>> markers hata ke sahi code rakho

# Step 4: Resolve hui files add karo
git add resolved-file.txt

# Step 5: Merge complete karo
git commit

# Agar merge abort karna ho (sab kuch undo)
git merge --abort
```

---

### 🔴 Situation 7: Rebase Conflict

```bash
# Rebase ke dauran conflict aaya
git status   # konflicted files dekhna

# Files manually fix karo
git add fixed-file.txt

git rebase --continue   # agle commit par jaao

# Ya skip karo
git rebase --skip

# Ya poora rebase abort karo
git rebase --abort
```

---

### 🔴 Situation 8: Deleted Commit Recover Karna (Lost Commit)

```bash
# Step 1: Reflog mein dhundho
git reflog

# Step 2: Lost commit ka hash note karo (e.g., abc1234)

# Step 3: Uss commit pe nayi branch banana
git checkout -b recovered-work abc1234

# Ya cherry-pick karke current branch mein lao
git cherry-pick abc1234

# Ya reset karke wapas lao
git reset --hard abc1234
```

---

### 🔴 Situation 9: Accidentally Deleted Branch Recover Karna

```bash
# Step 1: Reflog se branch ka last commit dhundho
git reflog --all
# Ya
git log --all --oneline | grep "last commit message"

# Step 2: Branch recreate karo
git checkout -b deleted-branch abc1234
# Ya
git branch deleted-branch abc1234
```

---

### 🔴 Situation 10: Stash Kiya Tha, Ab Wapas Chahiye

```bash
# Saare stashes dekhna
git stash list

# Latest stash apply karo
git stash pop

# Specific stash apply karo
git stash pop stash@{2}

# Stash preview karna (apply se pehle)
git stash show -p stash@{0}

# Stash se nayi branch banana
git stash branch new-feature stash@{0}
```

---

### 🔴 Situation 11: Rebase Galat Ho Gaya, Pehle Wali State Chahiye

```bash
# Reflog se pre-rebase state dhundho
git reflog
# "rebase-i (start):" wala entry dhundho

# Uss state par reset karo
git reset --hard ORIG_HEAD
# Ya reflog hash se
git reset --hard abc1234
```

---

### 🔴 Situation 12: Merge Ho Gayi, Wapas Separate Karna Hai

```bash
# Agar commit nahi push hua
git reset --hard ORIG_HEAD

# Agar push ho gaya — revert use karo
git revert -m 1 merge-commit-hash
git push origin main
```

---

### 🔴 Situation 13: Working Directory Mein Sab Changes Discard Karna

```bash
# Saari unstaged changes discard karna
git checkout -- .
# Ya modern syntax
git restore .

# Staged changes bhi discard karna
git reset --hard HEAD
```

---

### 🔴 Situation 14: Wrong Remote URL Set Ho Gayi

```bash
# Remote URL dekhna
git remote -v

# URL fix karna
git remote set-url origin https://github.com/correct-user/correct-repo.git

# Verify karna
git remote -v
```

---

### 🔴 Situation 15: Large File Accidentally Committed

```bash
# Agar abhi push nahi hua
git reset --soft HEAD~1
git rm --cached large-file.zip
echo "large-file.zip" >> .gitignore
git add .
git commit -m "Remove large file"

# Agar push ho chuka hai — history se hatana
git filter-repo --path large-file.zip --invert-paths
git push --force origin main
```

---

### 🔴 Situation 16: Detached HEAD State Mein Phans Gaye

**Detached HEAD kya hai?** — Jab tum directly ek commit checkout karte ho (branch nahi), Git "detached HEAD" mode mein chala jaata hai.

```bash
# Check karna
git status   # "HEAD detached at abc1234" message aayega

# Solution 1: Ek nayi branch banana yahan se
git checkout -b new-branch-name

# Solution 2: Wapas kisi branch par jaana
git checkout main

# Commits jo detached state mein kiye they — woh bhi yaad rakhne ke liye
git reflog   # hash note karo
git checkout main
git cherry-pick detached-commit-hash
```

---

### 🔴 Situation 17: Upstream Changes Pull Karna (Sync Fork)

```bash
# Upstream remote add karo (pehli baar)
git remote add upstream https://github.com/original/repo.git

# Upstream fetch karo
git fetch upstream

# Merge karo
git merge upstream/main

# Push karo apne fork mein
git push origin main
```

---

## 18. Command Combinations & Workflows

---

### 📋 Workflow 1: Daily Push Workflow (Standard)

```bash
# Subah kaam shuru karte waqt
git pull origin main              # Latest changes lao

# Kaam karo...

# Kaam khatam hone par
git status                         # Check karo kya change hua
git diff                           # Changes preview karo
git add .                          # Stage karo
git commit -m "Add: user login feature"   # Commit karo
git push origin main               # Push karo
```

---

### 📋 Workflow 2: Feature Branch Workflow

```bash
# Step 1: Main se latest lo
git checkout main
git pull origin main

# Step 2: Feature branch banana
git checkout -b feature/user-authentication

# Step 3: Kaam karo aur commit karte raho
git add .
git commit -m "Add: JWT token generation"

git add .
git commit -m "Add: password hashing with bcrypt"

# Step 4: Main se updates lao (agar koi kaam karta raha)
git fetch origin
git rebase origin/main

# Step 5: Push karo
git push -u origin feature/user-authentication

# Step 6: GitHub par Pull Request banao

# Step 7: PR merge hone ke baad cleanup
git checkout main
git pull origin main
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

---

### 📋 Workflow 3: Hotfix Workflow (Production Bug)

```bash
# Step 1: Production branch se hotfix branch banana
git checkout main
git pull origin main
git checkout -b hotfix/fix-payment-crash

# Step 2: Bug fix karo
git add .
git commit -m "Fix: payment crash on null user ID"

# Step 3: Tag lagao
git tag -a v1.0.1 -m "Hotfix: payment crash fix"

# Step 4: Merge karo aur push karo
git checkout main
git merge --no-ff hotfix/fix-payment-crash
git push origin main
git push origin v1.0.1

# Step 5: Develop branch mein bhi merge karo
git checkout develop
git merge --no-ff hotfix/fix-payment-crash
git push origin develop

# Step 6: Hotfix branch delete karo
git branch -d hotfix/fix-payment-crash
```

---

### 📋 Workflow 4: Collaborative Team Workflow (Pull Before Push)

```bash
# RULE: Hamesha pull before push!

git fetch origin              # Remote changes dekhna
git log origin/main..HEAD     # Tumhare commits jo push nahi hue
git log HEAD..origin/main     # Remote commits jo tumhare paas nahi hain

# Safe approach
git pull --rebase origin main  # Rebase karke pull (clean history)
git push origin main

# Agar conflict aaya pull mein
git rebase --abort
git pull --no-rebase origin main  # Merge ke saath pull
# Resolve conflicts
git push origin main
```

---

### 📋 Workflow 5: Rebase Workflow (Clean History)

```bash
# Feature branch pe kaam karna
git checkout feature-login
# ... commits karo...

# Main branch ko rebase karo (feature ke commits main ke upar rakho)
git fetch origin
git rebase origin/main

# Conflict aaya to:
# 1. File fix karo
git add fixed-file.js
git rebase --continue

# 2. Push karo (force-with-lease kyunki history changed)
git push --force-with-lease origin feature-login
```

---

### 📋 Workflow 6: Stashing for Context Switching

```bash
# Kaam chal raha hai feature par, urgent bug aaya
git stash push -m "WIP: user profile update"

# Hotfix branch par jaao
git checkout main
git checkout -b hotfix/urgent-bug

# Bug fix karo aur push karo
git add .
git commit -m "Fix urgent bug"
git push origin hotfix/urgent-bug

# Feature par wapas jaao
git checkout feature-user-profile
git stash pop    # Apna kaam wapas lao

# Continue karo...
```

---

### 📋 Workflow 7: Squash Merge (Clean PR History)

```bash
# Feature branch ke saare commits ek mein combine karna
git checkout main
git merge --squash feature-login

# Ek meaningful commit message ke saath commit karo
git commit -m "Feature: Complete user login system with JWT auth"

git push origin main

# Branch cleanup
git branch -d feature-login
```

---

### 📋 Workflow 8: Release Tagging Workflow

```bash
# Release ke liye prepare karo
git checkout main
git pull origin main

# Changelog/version update karo
git add .
git commit -m "Bump version to 2.0.0"

# Tag banana
git tag -a v2.0.0 -m "Release v2.0.0: Major UI overhaul"

# Push karo
git push origin main
git push origin v2.0.0
```

---

### 📋 Workflow 9: Code Review Integration Workflow

```bash
# Reviewer ke changes incorporate karna
git fetch origin
git checkout feature-branch

# Review changes dekho
git log --oneline origin/main..HEAD

# Requested changes karo
git add .
git commit -m "Address review: improve error handling"

# Rebase on latest main (clean PR)
git rebase origin/main
git push --force-with-lease origin feature-branch
```

---

### 📋 Workflow 10: Undo Last N Commits (Interactive)

```bash
# Last 3 commits rewrite karna
git rebase -i HEAD~3

# Editor mein aayega:
# pick abc123 Commit 1
# pick def456 Commit 2
# pick ghi789 Commit 3

# Squash karne ke liye:
# pick abc123 Commit 1
# squash def456 Commit 2
# squash ghi789 Commit 3

# Save karo, naya combined message likho, push karo
git push --force-with-lease origin branch-name
```

---

## 🔑 Quick Reference Cheat Sheet

| Command | Kya karta hai |
|---------|--------------|
| `git init` | Naya repo banana |
| `git clone <url>` | Repo copy karna |
| `git status` | Kya chal raha hai |
| `git add .` | Saab stage karna |
| `git commit -m "msg"` | Save karna |
| `git push` | GitHub par dalna |
| `git pull` | Aur wahan se lena |
| `git branch` | Branches dekhna |
| `git checkout -b name` | Nayi branch |
| `git merge branch` | Branch merge |
| `git log --oneline` | History dekhna |
| `git diff` | Changes dekhna |
| `git stash` | Work side mein rakhna |
| `git stash pop` | Wapas lena |
| `git reset --soft HEAD~1` | Last commit undo (safe) |
| `git reset --hard HEAD~1` | Last commit + changes delete |
| `git revert <hash>` | Commit ko undo commit se cancel |
| `git reflog` | Lost commits dhundna |
| `git cherry-pick <hash>` | Specific commit apply karna |

---

## 💡 Pro Tips

1. **`git status` hamesha run karo** koi bhi command se pehle — state samjho.
2. **Meaningful commit messages likho** — "Fix bug" nahi, "Fix: null pointer in user login" likho.
3. **Small, focused commits karo** — ek commit = ek logical change.
4. **Feature branches use karo** — main/master par directly mat push karo.
5. **`--force-with-lease` use karo** regular `--force` ki jagah.
6. **`.gitignore` pehle setup karo** — naye project ke shuruat mein hi.
7. **`git pull --rebase`** set karo default — cleaner history milti hai.
8. **`git reflog`** tumhara safety net hai — kuch bhi galat ho to yahan dhundho.
9. **Sensitive data kabhi commit mat karo** — ek baar GitHub par jaana dangerous hai.
10. **`git log --oneline --graph --all`** se poori project history ek nazar mein dekho.

---

*Last updated: 2025 | Git version 2.x compatible*
