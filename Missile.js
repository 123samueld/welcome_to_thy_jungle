export default class Missile
{
    constructor(canvas, context,{x, y, direction, speed, damage, colour})
    {
        this.canvas = canvas
        this.context = context
        this.width = 15
        this.height = 5
        this.position =
        {
            x,
            y
        }
        this.direction = direction
        this.speed = speed
        this.damage = damage
        this.colour = colour
    }

    draw()
    {
        this.context.fillStyle = this.colour
        if(this.direction == "forward")this.position.x += this.speed
        else this.position.x -= this.speed
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}