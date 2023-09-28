export default class BackgroundLayer
{
    constructor(context, scrollForward, image, velocity, velocityModifier, yPos)
    {
        this.context = context
        this.scrollForward = scrollForward
        this.image = image
        this.velocity = velocity
        this.velocityModifier = velocityModifier
        this.width = 1536
        this.height = 764
        this.position = {
            x: 0,
            y: yPos
        }
    }

    draw()
    {
        this.context.drawImage(this.image, this.position.x, this.position.y)
    }

    update()
    {
        if(this.scrollForward)this.position.x -= (this.velocity/16) * this.velocityModifier
        if(!this.scrollForward)this.position.x += (this.velocity/16) * this.velocityModifier
    }
    updateThenDrawBackground()
    {
        this.update()
        this.draw()
    }
}