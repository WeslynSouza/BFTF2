import { useState } from 'react';
import * as Classes from '../../assets/assets';

export default function CriarUsuario() {
    const [ demoman, setDemoman ] = useState(Classes.demoman);
    const [ spy, setSpy ] = useState(Classes.spy);
    const [ engieneer, setEngieneer ] = useState(Classes.engieneer);
    const [ soldier, setSoldier ] = useState(Classes.soldier);
    const [ medic, setMedic ] = useState(Classes.medic);
    const [ heavy, setHeavy ] = useState(Classes.heavy);
    const [ sniper, setSniper ] = useState(Classes.sniper);
    const [ scout, setScout ] = useState(Classes.scout);
    const [ pyro, setPyro ] = useState(Classes.pyro);

    function handleSelecionarClasse(classe: string) {
        switch(classe){
            case 'demoman': 
                if(demoman === Classes.demoman)
                    setDemoman(Classes.demomanBlue);
                else
                    setDemoman(Classes.demoman);
            break;
            case 'spy': 
                if(spy === Classes.spy)
                    setSpy(Classes.spyBlue);
                else    
                    setSpy(Classes.spy);
            break;
            case 'engieneer': 
                if(engieneer === Classes.engieneer)
                    setEngieneer(Classes.engieneerBlue);
                else 
                    setEngieneer(Classes.engieneer);
            break;
            case 'soldier': 
                if(soldier === Classes.soldier)
                    setSoldier(Classes.soldierBlue);
                else
                    setSoldier(Classes.soldier);
            break;
            case 'medic': 
                if(medic === Classes.medic)
                    setMedic(Classes.medicBlue);
                else
                    setMedic(Classes.medic);
            break;
            case 'heavy': 
                if(heavy === Classes.heavy)
                    setHeavy(Classes.heavyBlue);
                else 
                    setHeavy(Classes.heavy);
            break;
            case 'sniper': 
                if(sniper === Classes.sniper)
                    setSniper(Classes.sniperBlue);
                else
                    setSniper(Classes.sniper)
            break;
            case 'scout': 
                if(scout === Classes.scout)
                    setScout(Classes.scoutBlue);
                else
                    setScout(Classes.scout);
            break;
            case 'pyro': 
                if(pyro === Classes.pyro)
                    setPyro(Classes.pyroBlue);
                else 
                    setPyro(Classes.pyro);
            break;
        }
    }

}