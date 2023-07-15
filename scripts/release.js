const fs = require('fs');
const { execSync } = require('child_process');

function updatePackageJsonVersion(version) {
  try {
    // 读取 package.json 文件
    const packageJsonPath = './package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

    // 更新版本号
    packageJson.version = version;

    // 将更新后的 package.json 保存回文件
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // 创建 Git 标签
    const tagName = version;
    const commitMessage = version;
    execSync(`git tag -a ${tagName} -m "${commitMessage}"`);
    console.log('版本号已更新，并已创建 Git 标签。');

    execSync(`git tag -a ${tagName} -m "${commitMessage}"`);
    console.log('版本已提交。');
  } catch (error) {
    console.error('出现错误:', error);
  }
}

// 从命令行参数获取版本号
const version = process.argv[2];

// 执行函数
updatePackageJsonVersion(version);
