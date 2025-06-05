module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {},
        path: "app",
        message: [
          "python gradio_app.py",
        ],
        on: [
          {
            event: "/http:\\/\\/0\\.0\\.0\\.0:\\d+/",
            done: true
          }
        ]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0].replace('0.0.0.0', '127.0.0.1')}}"
      }
    },
    //
    {
      method: "shell.run",
      params: {
        message: ["start {{local.url}}"]
      }
    }
  ]
}