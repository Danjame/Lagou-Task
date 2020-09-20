#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

inquirer.prompt([{
    type: "input",
    name: "title",
    message: "set a title"
}]).then(data => {
    const tmplDir = path.join(__dirname, 'templates');
    const destDir = process.cwd();

    // console.log(tmplDir);
    // console.log(destDir);

    fs.readdir(tmplDir, (error, files) => {
        files.forEach(item => {
            const fileDir = path.join(tmplDir, item);
            // console.log(fileDir);

            ejs.renderFile(fileDir, data, (error, result) => {
                if (error) throw error;
                // console.log(result);
                const destFile = path.join(destDir, item);
                fs.writeFileSync(destFile, result);
            })
        })

    })
})