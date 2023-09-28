export default class RelationshipController
{
    constructor(keys, character, terrainPieces, chopper, NPCs, missiles, grenades, killScore, killStats, scoreMarkers, totalKillScore, gameScore)
    {
        this.keys = keys
        this.character = character
        this.terrainPieces = terrainPieces
        this.chopper = terrainPieces[24]
        this.enemies = NPCs[0]
        this.fauna = NPCs[2]
        this.missiles = missiles
        this.grenades = grenades
        this.killScore = killScore
        this.killStats = killStats
        this.scoreMarkers = scoreMarkers
        this.totalKillScore = totalKillScore
        this.gameScore = gameScore
    }

    proximitySensor(NPC)
    {
        let characterCenter = (this.character.position.x + 64)
        let NPCCenter = NPC.position.x + NPC.width/2
        let distanceBetweenCharacterAndNPC = Math.floor(Math.abs(characterCenter - NPCCenter))
        if(
            this.character.actions.facing == "forward" &&
            NPC.facing.facing == "backward" && 
            distanceBetweenCharacterAndNPC <= 70) return true
        else if(
            this.character.actions.facing == "backward" &&
            NPC.facing.facing == "forward" && 
            distanceBetweenCharacterAndNPC <= 70) return true
    }

    animateEnemyOnPlatform()
    {
        this.enemies.forEach((enemy) => 
        {
            if(enemy.health <= 0)
            {
                let killValue
                if(enemy.causeOfDeath == "FlashGunFire") 
                {
                    killValue = enemy.points * 3
                    this.killStats[0] ++
                    this.killStats[1] ++
                }
                if(enemy.causeOfDeath == "CloseCombat") 
                {
                    killValue = enemy.points * 5
                    this.killStats[0] ++
                    this.killStats[2] ++
                }
                if(enemy.causeOfDeath == "Grenade") 
                {
                    killValue = enemy.points * 8
                    this.killStats[0] ++
                    this.killStats[3] ++
                }

                this.totalKillScore += killValue
                this.scoreMarkers.push(new this.killScore(enemy.position.x + enemy.width, enemy.position.y - (enemy.height+20), killValue))

                const enemyIndex = this.enemies.indexOf(enemy)
                this.enemies.splice(enemyIndex, 1);
                enemy = null
            }
        })    
    }

    characterMissileHitsEnemyDetector()
    {
        this.missiles.forEach((missile) =>
        {
            this.enemies.forEach((enemy) =>
            {
                if(
                    enemy &&
                    missile.position.x + missile.width >= enemy.position.x &&
                    missile.position.x <= enemy.position.x + enemy.width &&
                    missile.position.y + missile.height >= enemy.position.y &&
                    missile.position.y <= enemy.position.y + enemy.height
                    )
                {
                    const missileIndex = this.missiles.indexOf(missile)
                    this.missiles.splice(missileIndex, 1);
                    const enemyIndex = this.enemies.indexOf(enemy)
                    this.enemies[enemyIndex].takeDamage(missile.damage)
                    if(enemy.health <= 0) enemy.causeOfDeath = "FlashGunFire"
                }
            })
        })    
    }

    grenadeBounce()
    {
        this.terrainPieces.forEach((platform)=> 
        {
            this.grenades.forEach((grenade)=>
            {
                if(
                    grenade &&
                    grenade.position.x + grenade.width >= platform.position.x &&
                    grenade.position.x <= platform.position.x + platform.width &&
                    grenade.position.y <= platform.position.y + platform.height &&
                    grenade.position.y + grenade.height >= platform.position.y
                 )
                {
                    if(grenade.velocity.y  <= 2.5)
                    {
                        grenade.velocity.y = 0
                        grenade.position.y = platform.position.y - grenade.height
                    }
                    else 
                    {
                        grenade.velocity.y -= 2
                    }
                    grenade.velocity.x -= 1
                    grenade.velocity.y *= -1
                }
            })
        })
    }

    grenadeExplode(currentTime)
    {
        this.grenades.forEach((grenade) =>
        {
            if(currentTime - grenade.timer >= grenade.fuse - 50) grenade.explode = true                
            if(currentTime - grenade.timer >= grenade.fuse)
            {
                if(
                    this.character.position.x + this.character.width >= grenade.position.x - grenade.blastRadius &&
                    this.character.position.x <= grenade.position.x + grenade.width + grenade.blastRadius && 
                    this.character.position.y + this.character.height >= grenade.position.y - grenade.blastRadius &&
                    this.character.position.y <= grenade.position.y + grenade.height + grenade.blastRadius)
                {
                    this.character.attributes.health -= grenade.damage

                    if(
                        this.character.position.x > grenade.position.x + (grenade.width/2) && 
                        this.character.position.y  > grenade.position.y + (grenade.height/2))
                    {
                        this.character.position.x += 150
                        this.character.position.y += 150
                    }
                    else if(
                        this.character.position.x < grenade.position.x + (grenade.width/2) &&
                        this.character.position.y  < grenade.position.y + (grenade.height/2))
                    {
                        this.character.position.x -= 150
                        this.character.position.y -= 150
                    }
                    else if(
                        this.character.position.x > grenade.position.x + (grenade.width/2) &&
                        this.character.position.y  < grenade.position.y + (grenade.height/2))
                    {
                        this.character.position.x += 150
                        this.character.position.y -= 150
                    }
                    else if(
                        this.character.position.x < grenade.position.x + (grenade.width/2) &&
                        this.character.position.y  > grenade.position.y + (grenade.height/2))
                    {
                        this.character.position.x -= 150
                        this.character.position.y += 150
                    }
                    else{
                        this.character.position.y -= 150
                    }
                }

                this.enemies.forEach((enemy) =>
                {
                    if(
                        enemy.position.x + enemy.width >= grenade.position.x - grenade.blastRadius &&
                        enemy.position.x <= grenade.position.x + grenade.width + grenade.blastRadius && 
                        enemy.position.y + enemy.height >= grenade.position.y - grenade.blastRadius &&
                        enemy.position.y <= grenade.position.y + grenade.height + grenade.blastRadius)
                    {
                        enemy.health -= grenade.damage
                        if(enemy.health <= 0) enemy.causeOfDeath = "Grenade"
                    }
                })
                const grenadeIndex = this.grenades.indexOf(grenade)
                this.grenades.splice(grenadeIndex, 1)
            }
        })   
    }

    characterAndEnemyCollisionDetector()
    {
        this.enemies.forEach((enemy) =>
        {
            if(
                this.character.actions.lunging && 
                enemy &&
                this.character.position.x + this.character.width >= enemy.position.x &&
                this.character.position.x <= enemy.position.x + enemy.width &&
                this.character.position.y + this.character.height >= enemy.position.y &&
                this.character.position.y <= enemy.position.y + enemy.height)
                {
                    enemy.health -= this.character.attributes.strength
                    if(enemy.health <= 0) enemy.causeOfDeath = "CloseCombat"
                }
            else if(
                !this.character.actions.lunging && 
                enemy &&
                this.character.position.x + this.character.width >= enemy.position.x &&
                this.character.position.x <= enemy.position.x + enemy.width &&
                this.character.position.y + this.character.height >= enemy.position.y &&
                this.character.position.y <= enemy.position.y + enemy.height)
                {
                    this.character.attributes.health--
                }
        })       
    }

    characterPerformingActions(){}

    countGameScore(inGameTimeer)
    {
        let timeLostScore = Math.floor(((inGameTimeer/16)/30)) * 5
        let healthLostScore = Math.abs(this.character.attributes.health - 100) * 5
        this.gameScore[0] = healthLostScore
        this.gameScore[1] = this.character.attributes.health
        this.gameScore[2] = this.totalKillScore - (healthLostScore + timeLostScore)
        return this.gameScore
    }
}