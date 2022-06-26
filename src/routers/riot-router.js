import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { userService } from '../services';
import axios from "axios"

const riotRouter = Router();


riotRouter.get('/recent20GAME', async (req, res, next) => {
    try {
        const recent_json = await axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`)
        const recent_version = recent_json.data[0]
        const spell_json = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/data/en_US/summoner.json`)
        const spell = spell_json.data.data
        const spell_jsoned = {}
        for (const [keys, value] of Object.entries(spell)){
            spell_jsoned[value.key] = keys
        }
        const runes_json = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/data/en_US/runesReforged.json`)
        const rune = runes_json.data

        function Rune_Check(perk1, perk1_2, perk2) {
            const main_rune = rune.find(e => e.id == perk1).slots[0].runes
            let first_rune = main_rune.find(e => e.id == perk1_2).icon
            first_rune = (`https://ddragon.leagueoflegends.com/cdn/img/${first_rune}`)
            let second_rune = rune.find(e => e.id == perk2).icon
            second_rune = (`https://ddragon.leagueoflegends.com/cdn/img/${second_rune}`)
            return ([first_rune,second_rune])
        }

        const nickname = req.body.name
        const headers = {
            "X-Riot-Token": process.env.RIOT_API_KEY
        }
        let response = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}`, {headers})
        const {id, profileIconId, puuid} = response.data
        console.log(id, profileIconId, puuid)
        console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/profileicon/${profileIconId}.png`)
        const InfoData = await axios.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`, {headers})
        const { tier, rank, summonerName, leaguePoints, wins, losses} = InfoData.data[0]
        console.log(tier, rank, summonerName, leaguePoints, wins, losses)
        const matches = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=20`, {headers})
        const match = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matches.data[0]}`, {headers})
        const gameDuration = ((match.data.info.gameDuration)/60).toFixed(1)
        console.log(gameDuration)
        const match_data = (match.data.info.participants)
        const game_user_dict = {}
        for(let i of match_data){
            if (i.summonerName == summonerName){
                console.log(i.champLevel)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${i.championName}.png`)
                const assists = (i.assists)
                const deaths = (i.deaths)
                const kills = (i.kills)
                const kill_average = ((kills+assists)/deaths).toFixed(2)
                console.log(kill_average)
                const total_kill = (i.totalMinionsKilled + i.neutralMinionsKilled)
                console.log(total_kill)
                const average_kill = Math.floor((total_kill/gameDuration)*10)/10
                console.log(average_kill)
                console.log(i.teamPosition)
                console.log(`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${spell_jsoned[i.summoner1Id]}.png`)
                console.log(`https://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/${spell_jsoned[i.summoner2Id]}.png`)

                const perk1 = (i.perks.styles[0].style)
                const perk1_2 = (i.perks.styles[0].selections[0].perk)
                const perk2 = (i.perks.styles[1].style)
                const runeData = Rune_Check(perk1, perk1_2, perk2)
                console.log(runeData)
                const killParticipation = i.challenges.killParticipation.toFixed(2)*100
                console.log(killParticipation)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item0}.png`)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item1}.png`)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item2}.png`)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item3}.png`)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item4}.png`)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item5}.png`)
                console.log(`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/item/${i.item6}.png`)
                console.log(i.visionWardsBoughtInGame)
                console.log(i.win)
            }
            const user_nick = (i.summonerName)
            const user_icon = (`https://ddragon.leagueoflegends.com/cdn/${recent_version}/img/champion/${i.championName}.png`)
            game_user_dict[user_nick] = user_icon
        }
        console.log(game_user_dict)
        res.status(201).json({"ok":"ok"});
    } catch (error) {
        next(error);
    }
});


export { riotRouter };
