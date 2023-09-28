export default class AIController
{
    constructor(character, NPCs, terrainPieces)
    {
        this.character = character
        this.NPCs = NPCs
        this.terrainPieces = terrainPieces
    }
    
    stanceSelector()
    {
        this.NPCs.forEach((NPCTypeGroup) =>
        {
            NPCTypeGroup.forEach((NPC) =>
            {
                switch(NPC.stance)
                {
                    case "stand ground":
                        this.standGround()
                        break
                    case "patrol":
                        this.perimeterPatrol(NPC)
                        break
                }
            })
        })
    }

    standGround(){}

    perimeterPatrol(NPC)
    {

        var distanceFromStart = Math.abs(NPC.position.x - NPC.startingPos.x)
        if(distanceFromStart <= 0)
        {
            NPC.position.x -= NPC.velocity.x
            NPC.facing = "backward"
        }
        else if(distanceFromStart >= 444)
        {
            NPC.position.x += NPC.velocity.x
            NPC.facing = "forward"
        }
        else
        {
            if(NPC.facing == "backward")
            {
                NPC.position.x -= NPC.velocity.x
            }
            else if(NPC.facing == "forward")
            {
                NPC.position.x += NPC.velocity.x
            }
        }
    } 


    handleAI()
    {
        this.stanceSelector()
    }
}