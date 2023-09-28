export default class Npc
{
    constructor(canvas, context, id, image, npcType, gameSpeed, facing, {x, y, h, w, health, stance, points, causeOfDeath})
    {
        this.canvas = canvas
        this.context = context
        this.id = id
        this.image = image
        this.npcType = npcType
        this.health = health
        this.stance = stance
        this.height = h
        this.width = w
        this.position = 
        {
            x: x,
            y: y
        }
        this.velocity = 
        {
            x: gameSpeed,
            y: gameSpeed
        },
        this.startingPos =
        {
            x: x,
            y: y
        },
        this.facing = facing
        this.points = points
        this.causeOfDeath = causeOfDeath
    }


    takeDamage(damage)
    {
        this.health -= damage
    }
}