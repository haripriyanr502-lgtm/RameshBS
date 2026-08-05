# Team Collaboration Guide: Portfolio Ramesh BS

This guide explains how team members can work together on this repository using Git, GitHub, and Antigravity.

---

## 1. Setting Up the Project (For Teammates)

### Step 1: Clone the Repository
Open your terminal (or command prompt) and run:
```bash
git clone https://github.com/Mukesh642/Portfolio_Ramesh_BS.git
cd Portfolio_Ramesh_BS
```

### Step 2: Open in Antigravity
1. Open **Antigravity**.
2. Click **File** > **Open Folder...** (or press `Ctrl + O` / `Cmd + O`).
3. Select the cloned `Portfolio_Ramesh_BS` directory.

### Step 3: Install Dependencies & Run Locally
In the Antigravity terminal:
```bash
# Install node packages
npm install

# Start development server
npm run dev
```
Open `http://localhost:3000` in your browser to preview the site.

---

## 2. Making Changes & Pushing Back to GitHub (For Teammates)

### Workflow Option A: Feature Branches (Recommended for Teams)
1. **Get the latest updates first**:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a new branch**:
   ```bash
   git checkout -b feature/your-task-name
   ```
3. **Make code changes or edit files** (you can ask Antigravity AI to assist you!).
4. **Stage and commit your work**:
   ```bash
   git add .
   git commit -m "Add: description of what you changed"
   ```
5. **Push your branch to GitHub**:
   ```bash
   git push -u origin feature/your-task-name
   ```
6. Open GitHub (`https://github.com/Mukesh642/Portfolio_Ramesh_BS`) and click **"Compare & pull request"**.

---

### Workflow Option B: Direct Push to Main (Simple / Small Teams)
1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```
2. **Make your changes**.
3. **Stage, commit, and push**:
   ```bash
   git add .
   git commit -m "Update portfolio sections"
   git push origin main
   ```

---

## 3. How to View & Review Teammates' Changes (For Repository Owner / Lead)

### View Changes on GitHub
1. Go to [Repository Pull Requests](https://github.com/Mukesh642/Portfolio_Ramesh_BS/pulls).
2. Click on the Pull Request.
3. Click the **Files changed** tab to see line-by-line diffs (green = added, red = deleted).
4. Review the code, add comments if needed, and click **Merge Pull Request**.

### Pull Changes locally to your Machine
In your terminal inside Antigravity:
```bash
# Fetch and merge latest changes from GitHub
git pull origin main

# View recent commit history
git log -n 5 --oneline
```

### View Diffs inside Antigravity
- Click the **Source Control** icon on the left sidebar (or press `Ctrl + Shift + G`).
- You can inspect modified files, compare changes line-by-line, and stage/commit directly from the UI.
