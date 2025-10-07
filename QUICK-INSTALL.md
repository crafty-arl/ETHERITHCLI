# Quick Install Guide

## Super Simple Installation

### Option 1: Automated (Recommended)

Just double-click: **`install.bat`**

This will:
1. Install all dependencies
2. Build the project
3. Link CLI globally

After installation, use `etherith` from anywhere!

---

### Option 2: Manual (3 commands)

```bash
npm install
npm run build
npm link
```

That's it!

---

## After Installation

Use the CLI from anywhere:

```bash
# Get help
etherith --help

# Create vault
etherith init "Family Archive"

# Add files
etherith add photo.jpg

# Search
etherith search grandma
```

---

## How It Works

### npm install
Downloads all dependencies from npm registry

### npm run build
Compiles TypeScript → JavaScript in `dist/` folder

### npm link
Creates global symlink so you can run `etherith` from anywhere

---

## Uninstall

```bash
npm run uninstall-cli
```

Or manually:
```bash
npm unlink -g
```

---

## Troubleshooting

### "Permission denied" or "EACCES"
**Solution:** Run as administrator

**Windows:**
```bash
# Right-click install.bat → "Run as administrator"
```

**Linux/macOS:**
```bash
sudo npm link
```

### "Command not found: etherith"
**Solution:** npm link didn't work. Try:
```bash
npm link
# Or add to PATH manually
```

### npm install fails
**Solution:**
```bash
npm cache clean --force
npm install
```

---

## Development Mode

Want to develop while it's linked?

```bash
npm install
npm link
npm run dev  # Uses tsx for hot reload
```

Changes to `src/` are immediately available!

---

## Why This Is Easy

Traditional approach:
1. npm install
2. npm run build
3. Copy files
4. Update PATH
5. Create wrapper script
6. Test everything

**Our approach:**
1. npm install
2. npm run build
3. npm link

**Done!** npm handles everything automatically.

---

## What npm link Does

1. Creates symlink in global node_modules:
   ```
   /usr/local/lib/node_modules/etherith-cli → /path/to/your/project
   ```

2. Creates bin command:
   ```
   /usr/local/bin/etherith → /usr/local/lib/node_modules/etherith-cli/dist/cli.js
   ```

3. You can now run `etherith` from anywhere!

---

## Benefits

✅ **No PATH configuration** - npm handles it
✅ **No manual copying** - uses symlinks
✅ **Hot development** - changes reflect immediately
✅ **Easy uninstall** - one command
✅ **Works everywhere** - Windows, macOS, Linux
✅ **Standard npm** - no custom tooling needed

---

## Files Created

After `npm link`:

**Global:**
- `etherith` command in PATH
- Symlink in global node_modules

**Local:**
- `node_modules/` - dependencies
- `dist/` - compiled CLI
- `package-lock.json` - lockfile

**No garbage, no mess!**

---

## Alternative: Use directly without linking

Don't want global install?

```bash
npm install
npm run build

# Use locally
node dist/cli.js init "Family Archive"
```

---

## Summary

**Easiest install:**
```bash
install.bat
```

**Manual install:**
```bash
npm install && npm run build && npm link
```

**Use CLI:**
```bash
etherith --help
```

**Uninstall:**
```bash
npm run uninstall-cli
```

**That's it!** 🎉
