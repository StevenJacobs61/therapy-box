import React, { useEffect, useState } from 'react'
import { getSportData } from '../../functions/getSportsData'
import Styles from './sport.module.css'

type Match = {
  HomeTeam: string,
  AwayTeam: string,
  FTR: string,
}

const Sport: React.FC = () => {
  const [data, setData] = useState<Match[]>([])
  const [team, setTeam] = useState<string>('')
  const [defeatedTeams, setDefeatedTeams] = useState<[string] | undefined>([''])

  useEffect(()=>{
    async function getMatchData(){
      const linkUrl = "https://www.football-data.co.uk/mmz4281/1718/I1.csv"
      try{
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/sport`, {
            method: "POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ linkUrl })
          });
          const data = await res.json()
          setData(data);

      }catch(err){
        console.error(err);
      }
    }
    getMatchData();
  }, [])


  const getTeams = async () => {
    const teamToSearch: string = team.charAt(0).toUpperCase() + team.slice(1);
    const resultArr = await getSportData({teamToSearch, data, setDefeatedTeams});
  }


  return (
    <section className={`flex--col ${Styles.section}`}>
        <input className={`input ${Styles.input}`} type='text' placeholder='Input team name' 
        onChange={(e)=> setTeam(e.target.value)}
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            getTeams();
          }
        }}/>
        <div className={Styles.teamNames}>
          {defeatedTeams?.map((team, index)=> 
            <h2 key={index} className={Styles.name}>{team}</h2>
          )}
       
        </div>
    </section>
  )
}

export default Sport
