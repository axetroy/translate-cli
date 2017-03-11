## translate-cli

A cli tool for translate text in terminal.

Use Baidu Translate API.

### Installation

```bash
npm install @axetroy/translate-cli -g
```

### Usage

```
$ translate -h

  Usage: translate [content] [options]

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -f, --from <lang>  From Language, short locale name, like: en,zh,jp
    -t, --to <lang>    To Language, short locale name, like: en,zh,jp
```

```bash
$ translate
# translate REPL, will translate automatically, just need you type word then [Enter]

$ translate 你好世界
# output >>> Hello world

# or you can reverse it

$ translate Hello world
# output >>> 你好世界

# or you can use stream pipe

$ cat ./test
# output >>> Hello world
$ cat ./test | translate
# output >>> 你好世界
```

### Contribute

```bash
$ git clone https://github.com/axetroy/translate-cli.git
$ cd ./translate-cli
$ yarn
$ ./bin/translate-cli hello world
```

You can flow [Contribute Guide](https://github.com/axetroy/translate-cli/blob/master/contributing.md)

## License

The [MIT License](https://github.com/axetroy/translate-cli/blob/master/LICENSE)