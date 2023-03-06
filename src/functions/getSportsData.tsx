import React from 'react'

interface Sports{
    teamToSearch: any,
    data: Match[],
    setDefeatedTeams: any
}
type Match = {
    HomeTeam: string,
    AwayTeam: string,
    FTR: string,
}

export const getSportData = ({teamToSearch, data, setDefeatedTeams} : Sports) => {
    let teamsArr: string[] = [];
    setDefeatedTeams()
    const dataMap = data.map((match) => {
        let home = match.HomeTeam;
        let away = match.AwayTeam;
        let result = match.FTR;

        if(home == teamToSearch && result == "H"){
            teamsArr.push(away)
        } else if (away == "t" && result == "A"){
            teamsArr.push(home)
        }
    })
const uniqueTeams = [...new Set(teamsArr)];
    setDefeatedTeams(uniqueTeams);

    return 
}
