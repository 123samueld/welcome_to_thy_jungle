export default class Grenade
{
    constructor(canvas, context, image, gravity, frictionCoeificient, direction, {xP, yP, xV, yV}, timer, fuse, explode, damage, blastRadius, colour)
    {
        this.canvas = canvas
        this.context = context
        this.image = image
        this.gravity = gravity
        this.friction = frictionCoeificient
        this.direction = direction
        this.bounce = false
        this.height = 40
        this.width = 40
        this.startingPos = 
        {
            x: xP,
            y: yP
        }
        this.position = 
        {
            x: xP, 
            y: yP
        }
        this.velocity =
        {
            x: xV,
            y: yV
        }
        this.timer = timer
        this.fuse = fuse
        this.explode = explode
        this.damage = damage
        this.blastRadius = blastRadius
        this.colour = colour        
    }

    draw()
    {
        this.context.fillStyle = this.colour
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    arcTrajectory(xDiff)
    {
        if(this.direction == "forward")
        {
            if(xDiff < 600) 
            {
                this.velocity.y -= this.gravity 
                this.position.y -= this.velocity.y
            }
            else
            {
                this.velocity.y += this.gravity
                this.position.y += this.velocity.y
    
            }
                if(this.velocity.x <= 0)
                {
                    this.velocity.x = 0
                }
                else
                {
                    this.velocity.x -= this.friction
                }
                this.position.x += this.velocity.x
        }
        else
        {
            if(xDiff < 350) 
            {
                this.velocity.y -= this.gravity / 2
                this.position.y -= this.velocity.y
    
            }
            else
            {
                this.velocity.y += this.gravity / 2
                this.position.y += this.velocity.y
    
            }
            if(this.velocity.x <= 0)
            {
                this.velocity.x = 0
            }
            else
            {
                this.velocity.x -= this.friction
            }
                this.position.x -= this.velocity.x
        }
    }

    update()
    {
        //this.draw()
        let xDiff = this.position.x - this.startingPos.x
        this.arcTrajectory(xDiff)
    }
}