class Draw {
  //el constructor de la clase recibe el elemento canvas
  constructor(canvasEl) {
    this.canvas = canvasEl;
    //crear una nueva imagen
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.setAttribute("crossOrigin", "anonymous");
  }

  render(url) {
    this.image.setAttribute("src", url);
    this.ctx.font = "30px sans-serif";
    this.ctx.textBaseline = "top";
    this.ctx.fillText("Loading!...", 0, 0, this.canvas.width);
    return new Promise((resolve, reject) => {
      this.image.addEventListener("load", () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
          this.image,
          0,
          0,
          this.canvas.width,
          this.canvas.height
        );
        resolve("Listo para obtener los colores");
      });
    });
  }

  //obtener los colores segun la imagen que se cargue en el canvas
  colorPalette(quality = 90) {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    ).data;
    const colors = [];

    for (
      let i = 0;
      i < this.canvas.width * this.canvas.height;
      i = i + quality
    ) {
      const offset = i * 4;
      const alpha = imageData[offset + 3];

      if (alpha > 0) {
        //hay color
        const red = imageData[offset];
        const green = imageData[offset + 1];
        const blue = imageData[offset + 2];
        colors.push({ red, green, blue });
        console.log("%c color", `background: rgba(${red}, ${green}, ${blue})`); //colorear en la consola
      }
    }
    // console.log(imageData);
    return colors;
  }
}

export default Draw;
