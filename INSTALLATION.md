# Etherith CLI - Installation Guide

## Quick Installation

### Windows
```bash
# Double-click or run from command prompt:
install.bat
```

### Linux/macOS
```bash
# Run from terminal:
chmod +x install.sh
./install.sh
```

That's it! The installer will:
1. Check your environment (Node.js 18+)
2. Install dependencies
3. Build the project
4. Verify everything works

---

## Requirements

- **Node.js**: 18.0.0 or higher
- **npm**: Included with Node.js
- **Internet**: Required for downloading dependencies
- **Disk Space**: ~200 MB for installation

---

## Installation Steps (Automatic)

The installer handles everything automatically:

### [1/4] Environment Check
- Verifies package.json exists
- Checks Node.js installation
- Verifies npm is available

### [2/4] Install Dependencies
- Clears npm cache
- Downloads all required packages
- Takes 2-5 minutes

### [3/4] Build Project
- Compiles TypeScript to JavaScript
- Creates the CLI executable
- Prepares for use

### [4/4] Verify Installation
- Checks dist/cli.js exists
- Tests CLI functionality
- Shows success message

---

## After Installation

Once installed, you can use Etherith CLI:

```bash
# Create your family vault
node dist/cli.js init "My Family Archive"

# Add your first treasure
node dist/cli.js add "path/to/family-photo.jpg"

# Search your memories
node dist/cli.js search "grandma"

# View all commands
node dist/cli.js --help
```

---

## Troubleshooting

### "Node.js not found"
**Solution:** Install Node.js 18+ from [nodejs.org](https://nodejs.org/)

After installation, restart your terminal and run the installer again.

### "npm not found"
**Solution:** npm comes with Node.js. If missing:
1. Reinstall Node.js from [nodejs.org](https://nodejs.org/)
2. Make sure to check "Add to PATH" during installation
3. Restart your terminal

### "Failed to install dependencies"
**Solutions:**
```bash
# Clear npm cache and retry
npm cache clean --force
install.bat

# Or run commands manually
npm install
npm run build
```

**Common causes:**
- No internet connection
- Antivirus blocking npm
- Corporate firewall
- npm cache corruption

### "Build failed"
**Solutions:**
1. Make sure all source files are present
2. Check for TypeScript errors in output
3. Try: `npm install typescript -g`
4. Reinstall dependencies: delete `node_modules` folder, run installer again

### "Permission denied"
**Solution:** Run as administrator (Windows) or with sudo (Linux/macOS)

**Windows:**
```bash
# Right-click install.bat → "Run as administrator"
```

**Linux/macOS:**
```bash
sudo ./install.sh
```

---

## Manual Installation

If the automatic installer doesn't work, install manually:

### Step 1: Check Node.js
```bash
node --version
# Should show v18.0.0 or higher
```

If not installed, get it from [nodejs.org](https://nodejs.org/)

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Build Project
```bash
npm run build
```

### Step 4: Verify
```bash
node dist/cli.js --version
```

If you see the version number, you're ready!

---

## Advanced Options

### Install from npm (when published)
```bash
npm install -g etherith-cli
etherith --help
```

### Development Installation
```bash
# Install dev dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build
```

### Uninstall
```bash
# If installed globally
npm uninstall -g etherith-cli

# If installed locally
# Just delete the project folder
```

---

## Getting Help

### Installation Issues
1. Check this guide first
2. Make sure Node.js 18+ is installed
3. Try manual installation steps
4. Check GitHub issues

### Using Etherith CLI
```bash
# View all commands
node dist/cli.js --help

# Get help for specific command
node dist/cli.js init --help
```

### Documentation
- **README.md** - Overview and features
- **INSTALLATION.md** - This file
- GitHub repository - Code and examples

---

## System Requirements

### Minimum
- **OS**: Windows 10, macOS 10.15, Ubuntu 20.04 or newer
- **Node.js**: 18.0.0+
- **RAM**: 512 MB
- **Disk**: 200 MB

### Recommended
- **Node.js**: 20.0.0+ (LTS version)
- **RAM**: 1 GB
- **Disk**: 500 MB (includes space for archives)

---

## What Gets Installed

The installation includes:

### Core Dependencies
- **axios** - HTTP client for API requests
- **chalk** - Terminal colors and formatting
- **commander** - CLI framework
- **inquirer** - Interactive prompts
- **ora** - Loading spinners
- **sqlite3** - Local database
- **form-data** - File uploads

### Development Tools (optional)
- **TypeScript** - Type-safe development
- **ESLint** - Code linting
- **Jest** - Testing framework

### Output
- **dist/cli.js** - Compiled CLI executable
- **node_modules/** - Dependencies
- **package-lock.json** - Dependency lock file

---

## Next Steps

After successful installation:

1. **Read README.md** for feature overview
2. **Create your first vault** with `init` command
3. **Add family treasures** with `add` command
4. **Explore all commands** with `--help`

**Preserve your family's legacy forever!** 🌳
