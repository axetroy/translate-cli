const process = require('process');

const co = require('co');
const program = require('commander');
require('colors');

const translate = require('./translate');

const argv = [].slice.call(process.argv);

program
  .version('0.0.1')
  .option('-f, --from <lang>', 'From lang')
  .option('-t, --to <lang>', 'To lang');

program.parse(process.argv);

if (argv.length <= 2) {
  process.stdout.write(`Now, type the text that you want to translate:\n`.yellow);
  let count = 0;
  process.stdin.on('data', function (data) {
    console.log(count, data + '');
    count++;
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