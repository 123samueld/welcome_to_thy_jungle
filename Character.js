export default class Character
{
    constructor(canvas, context, image, gravity, 
        {
            strength, 
            speed
        },
        {
            facing,
            walking, 
            airbourne,
            jumping, 
            shooting, 
            lunging, 
            throwing,
        }, 
        teamMembers)
    {
        this.canvas = canvas
        this.context = context
        this.image = image
        this.gravity = gravity
        this.attributes = 
        {
            health: 100,
            strength: strength,
            speed: speed

        }
        this.actions = 
        {
            facing: facing,
            walking: walking, 
            airbourne: airbourne,
            jumping: jumping, 
            shooting: shooting, 
            lunging: lunging, 
            throwing: throwing
        }
        this.height = 40
        this.width = 40
        this.position =
        {
            y: 687.5, 
            x: 0
        }
        this.velocity =
        {
            y: 0,
            x: 0
        },
        this.teamMembers = teamMembers
    }

    update()
    {
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        this.velocity.y += this.gravity
    }
}