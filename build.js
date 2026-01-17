const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
    console.log('Building client...');
    execSync('cd client && npm install && npm run build', { stdio: 'inherit' });

    const clientDist = path.join(__dirname, 'client', 'dist');
    const rootDist = path.join(__dirname, 'dist');

    if (fs.existsSync(rootDist)) {
        console.log('Cleaning existing dist...');
        fs.rmSync(rootDist, { recursive: true, force: true });
    }

    console.log('Moving build artifacts to root dist...');
    fs.mkdirSync(rootDist, { recursive: true });

    // Recursive copy function (Node 16+ has fs.cpSync)
    fs.cpSync(clientDist, rootDist, { recursive: true });

    console.log('Build completed successfully.');
} catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
}
