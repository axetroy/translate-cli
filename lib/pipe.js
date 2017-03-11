const process = require('process');

const co = require('co');
const program = require('commander');
require('colors');

const translate = require('./translate');
const pkg = require('../package.json');

const argv = [].slice.call(process.argv);

program
  .version(pkg.version)
  .usage('[content] [options]')
  .option('-f, --from <lang>', 'From Language, short locale name, like: en,zh,jp')
  .option('-t, --to <lang>', 'To Language, short locale name, like: en,zh,jp');

program.parse(process.argv);

if (argv.length <= 2) {
  process.stdout.write(`Now, type the text that you want to translate:\n`.yellow);
  process.stdin.on('data', function (data) {
    co(function*() {
      const result = yield translate({
        from: program.from || '',
        to: program.to || '',
        query: data + ''
      });
      process.stdout.write(`${result.green.underline}\n`);
    }).catch(function (err) {
      console.error(err);
    });
  });
}
else if (argv.length >= 3) {
  const word = argv.splice(2).join(' ');
  co(function *() {
    const result = yield translate({
      from: program.from || '',
      to: program.to || '',
      query: word + ''
    });
    process.stdout.write(`${result.green.underline}\n`);
    process.exit(0);
  }).catch(function (err) {
    console.error(err);
  });
}