export default class Platform
{
    constructor(canvas, context, terrainType, image, {w, h, x, y, colour})
    {
        this.canvas = canvas
        this.context = context
        this.terrainType = terrainType
        this.image = image
        this.width = w
        this.height = h
        this.pathingCost = 0
        this.position = 
        {
            y: y,
            x: x
        } 
        this.colour = colour
    }
}