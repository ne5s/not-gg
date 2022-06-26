import { Schema } from 'mongoose';

const MatchSchema = new Schema(
  {
    matchId : {
      type : String,
      required: true,
    },
    gameCreation : { // 게임 만들어진 시간(miliseconds)
      type : String,
      required: true,
    },
    gameDuration : { // 게임 시간(seconds)
      type : String,
      required: true,
    },
    gameCreation : { // 게임 시작시간(miliseconds)
      type : String,
      required: true,
    },
    queueId : { // 420 -> 솔로랭크, 440 -> 자유랭크, 450 -> 칼바람, 430 -> 일반
      type : String,
      required: true,
    },
    blueBans : [   // 벤, 블루팀/레드팀 여부, 승리/패배 기록
      { 
        type : new Schema(
          {
            champId : String,
            banUser : Number, // 1, 2, 3, 4, 5
          },
          {
            _id : false,
          },
        ),
        required : false,
      }
    ],
    redBans : [   // 벤, 블루팀/레드팀 여부, 승리/패배 기록
      { 
        type : new Schema(
          {
            champId : String,
            banUser : Number, // 6, 7, 8, 9, 10
          },
          {
            _id : false,
          },
        ),
        required : false,
      }
    ],
    // teamId : { // 100 : 블루팀, 200 : 레드팀
    //   type : Number,
    //   required : false,
    // },
    win : {
      type:String, // blue / red
      required : false,
    },
    // user 1~5 (blue team), user6~10 (red team)
    user1 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user2 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user3 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user4 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user5 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user6 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user7 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user8 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user9 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    },
    user10 : {
      type : new Schema(
        {
          championName : String,
          champLevel : Number,
          kills : Number,
          death : Number,
          assists : Number,
          lane : String,
          summonerName : String,
          summonerLevel : Number,
          win : Boolean,
          kda : Number,
          goldEarned : Number,
          totalDamageDealt : Number, // 총 딜량
          totalDamageDealtToChampions : Number, // 챔피언 딜량
          totalDamageTaken : Number, // 받은 피해량
          visionWardsBoughtInGame : Number, // 제어와드 구매수
          wardsKilled : Number, // 와드 파괴수
          wardsPlaced : Number, // 와드 설치 수
          cs : Number, // 미니언 + 정글(총 cs)
          killParticipation : Number, // 킬 관여율(0.5172...Number(killParticipation.toFixed(2)) 필요 )
          item0 : Number, // http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/1001.png
          item1 : Number,
          item2 : Number,
          item3 : Number,
          item4 : Number, // 0이면 빈 칸
          item5 : Number,
          item6 : Number, // 장신구
          primaryStyle : Number, // 주 소환사 룬 (선제공격, 집중공격 ...)
          subStyle : Number, // 부 소환사룬 특성(지배,정밀,영감,결의,마법)
          spell1 : Number, // 스펠 D
          spell2 : Number, // 스펠 F
        }
      )
    }
  },
  {
    collection: 'match',
    timestamps: true,
  }
);

export { MatchSchema };

/* championId, -1 : no ban //

"keys":{"266":"Aatrox","103":"Ahri","84":"Akali","166":"Akshan","12":"Alistar","32":"Amumu","34":"Anivia","1":"Annie","523":"Aphelios","22":"Ashe","136":"AurelionSol","268":"Azir","432":"Bard","200":"Belveth","53":"Blitzcrank","63":"Brand","201":"Braum","51":"Caitlyn","164":"Camille","69":"Cassiopeia","31":"Chogath","42":"Corki","122":"Darius","131":"Diana","119":"Draven","36":"DrMundo","245":"Ekko","60":"Elise","28":"Evelynn","81":"Ezreal","9":"Fiddlesticks","114":"Fiora","105":"Fizz","3":"Galio","41":"Gangplank","86":"Garen","150":"Gnar","79":"Gragas","104":"Graves","887":"Gwen","120":"Hecarim","74":"Heimerdinger","420":"Illaoi","39":"Irelia","427":"Ivern","40":"Janna","59":"JarvanIV","24":"Jax","126":"Jayce","202":"Jhin","222":"Jinx","145":"Kaisa","429":"Kalista","43":"Karma","30":"Karthus","38":"Kassadin","55":"Katarina","10":"Kayle","141":"Kayn","85":"Kennen","121":"Khazix","203":"Kindred","240":"Kled","96":"KogMaw","7":"Leblanc","64":"LeeSin","89":"Leona","876":"Lillia","127":"Lissandra","236":"Lucian","117":"Lulu","99":"Lux","54":"Malphite","90":"Malzahar","57":"Maokai","11":"MasterYi","21":"MissFortune","62":"MonkeyKing","82":"Mordekaiser","25":"Morgana","267":"Nami","75":"Nasus","111":"Nautilus","518":"Neeko","76":"Nidalee","56":"Nocturne","20":"Nunu","2":"Olaf","61":"Orianna","516":"Ornn","80":"Pantheon","78":"Poppy","555":"Pyke","246":"Qiyana","133":"Quinn","497":"Rakan","33":"Rammus","421":"RekSai","526":"Rell","888":"Renata","58":"Renekton","107":"Rengar","92":"Riven","68":"Rumble","13":"Ryze","360":"Samira","113":"Sejuani","235":"Senna","147":"Seraphine","875":"Sett","35":"Shaco","98":"Shen","102":"Shyvana","27":"Singed","14":"Sion","15":"Sivir","72":"Skarner","37":"Sona","16":"Soraka","50":"Swain","517":"Sylas","134":"Syndra","223":"TahmKench","163":"Taliyah","91":"Talon","44":"Taric","17":"Teemo","412":"Thresh","18":"Tristana","48":"Trundle","23":"Tryndamere","4":"TwistedFate","29":"Twitch","77":"Udyr","6":"Urgot","110":"Varus","67":"Vayne","45":"Veigar","161":"Velkoz","711":"Vex","254":"Vi","234":"Viego","112":"Viktor","8":"Vladimir","106":"Volibear","19":"Warwick","498":"Xayah","101":"Xerath","5":"XinZhao","157":"Yasuo","777":"Yone","83":"Yorick","350":"Yuumi","154":"Zac","238":"Zed","221":"Zeri","115":"Ziggs","26":"Zilean","142":"Zoe","143":"Zyra"} */