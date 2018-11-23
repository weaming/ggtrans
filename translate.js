#!/usr/bin/env node

const translate = require('google-translate-api');
const fs = require('fs');


let cli_args = process.argv.slice(2);
let p = console.log.bind(console);
// console.log(cli_args)

if (cli_args.length >= 1) {
  let text = cli_args[0];
  if (text[0] == "/") {
    text = fs.readFileSync(text, 'utf8')
  }
  let to;

  if (cli_args.length == 1) {
    if (text.match(/[a-z ,.;/\\'"!?(){}\[\]\n\r\t]/i)) {
      to = 'zh-cn';
    } else {
      to = 'en';
    }
  } else {
    to = cli_args[1];
  }

  translate(text, {to: to}).then(res => {
    // p(`From : ${res.from.language.iso}`)
    // p(`  To : ${to}`)
    // if (res.from.text.autoCorrected) {
    //   p(`Text : ${res.from.text.value}`)
    // }
    // p(`---------------`)
    p(text.trim())
    p(res.text);
    // p()
  }).catch(err => {
    console.error(err);
  });
} else {
  p('Please give the content to be translated.')
  process.exit(1)
}
