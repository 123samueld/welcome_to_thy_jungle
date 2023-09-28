export default class KillScore
{
    constructor(x, y, value)
    {
        this.position = 
        {
            x,
            y
        }
        this.value = value
        this.velocity = 0.5
        this.alpha = 1
    }

    update()
    {
        this.position.y -= this.velocity
        if(this.alpha > 0)this.alpha -= 0.0075
        else this.alpha = 0
    }
}