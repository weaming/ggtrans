#!/usr/bin/env node

const translate = require('google-translate-api');

let cli_args = process.argv.slice(2);
let p = console.log.bind(console);
// console.log(cli_args)

if (cli_args.length >= 1) {
  let text = cli_args[0];
  let to;

  if (cli_args.length == 1) {
    if (text.match(/[a-z ]/i)) {
      to = 'zh-cn';
    } else {
      to = 'en';
    }
  } else {
    to = cli_args[1];
  }

  translate(text, {to: to}).then(res => {
    p(`From : ${res.from.language.iso}`)
    p(`  To : ${to}`)
    if (res.from.text.autoCorrected) {
      p(`Text : ${res.from.text.value}`)
    }
    p(`---------------`)
    p(res.text);
    p()
  }).catch(err => {
    console.error(err);
  });
} else {
  p('please give text')
}
