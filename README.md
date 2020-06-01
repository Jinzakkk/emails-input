# Emails input

Emails-input field component. [DEMO](https://jinzakkk.github.io/emails-input/demo/)

### Description

- Creates a new email on blur, comma and supports pasting comma separated values
- Validation support
- Browsers support (IE 11 and the latest versions of Chrome, Safari, Firefox, Edge)

### Installation

Download [lib/dist](https://github.com/Jinzakkk/emails-input/tree/master/lib/dist) and import the files into your project.

### Example ([or demo code](https://github.com/Jinzakkk/emails-input/blob/master/demo/index.html#L110-L142))

```html
<html>
  <head>
    <link rel="stylesheet" href="dist/emails-input.css" />
  </head>
  <body>
    <div id="wrapper"></div>

    <script src="dist/emails-input.js"></script>
    <script>
      var wrapper = document.querySelector('#wrapper');
      var emailsInput = EmailsInput(wrapper, { inputPlaceholder: 'some placeholder...' });
    </script>
  </body>
</html>
```

### API

| Property    | Description            | Type             |
| ----------- | ---------------------- | ---------------- |
| emailsInput | Component DOM instance | `HTMLDivElement` |

| Method         | Description                                  | Param                  | Return                                                    |
| -------------- | -------------------------------------------- | ---------------------- | --------------------------------------------------------- |
| getAllEmails   | Get all emails from the state                |                        | `Array<{ value: string, isValid: boolean, key: string }>` |
| addEmail       | Add email to the state                       | `email: string`        |                                                           |
| replaceEmails  | Replace all current values by the new emails | `email: Array<string>` |                                                           |
| addObserver    | Add observer on the state changes            | `callback: Function`   |                                                           |
| removeObserver | Remove observer                              | `callback: Function`   |                                                           |
