module.exports = {
  run: [
    // Step 1: Clone the project repository
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/Tencent-Hunyuan/HunyuanPortrait app"
        ]
      }
    },

    // Step 2: Set up the Python environment (optional torch config)
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
          // Uncomment as needed:
          // xformers: true,
          // triton: true,
          // sageattention: true
        }
      }
    },

    // Step 3: Install Python dependencies
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio devicetorch",
          "uv pip install -r requirements.txt"
        ]
      }
    },

    // Step 4: Download yoloface_v5m.pt to app/pretrained_weights/
    {
      method: "hf.download",
      params: {
        path: "app/pretrained_weights",
        "_": ["LeonJoe13/Sonic"],
        "include": '"*.pt"',
        "--local-dir": "."
      }
    },

    // Step 5: Download config JSONs and VAE weights to app/pretrained_weights/
    {
      method: "hf.download",
      params: {
        path: "app/pretrained_weights",
        "_": ["stabilityai/stable-video-diffusion-img2vid-xt"],
        "include": '"vae/*diffusion_pytorch_model.fp16.safetensors" "*.json"',
        "--local-dir": "."
      }
    },

    // Step 6: Download arcface.onnx to app/pretrained_weights/
    {
      method: "hf.download",
      params: {
        path: "app/pretrained_weights",
        "_": ["FoivosPar/Arc2Face"],
        "include": '"*.onnx"',
        "--local-dir": "."
      }
    },

    // Step 7: Download .pth weights to app/pretrained_weights/hyportrait/
    {
      method: "hf.download",
      params: {
        path: "app/pretrained_weights",
        "_": ["tencent/HunyuanPortrait"],
        "include": '"*.pth"',
        "--local-dir": "hyportrait"
      }
    }
  ]
};