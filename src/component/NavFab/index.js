import React, { useState, useMemo } from 'react'
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';


const Root = styled.div`
    position: fixed;
    bottom: 24px;
    right: 24px;
    display: flex;
    flex-direction:column ;
    align-items:center;
`

const StyledFab = styled(Fab)`
    opacity:${({ hide }) => hide ? 0 : 1} !important;
    transition: opacity 0.3s ease-out !important;
`
const MainFab = styled(Fab)`
    font-size:24pt !important;
    display: flex;
    align-items:center;
    justify-content: space-between;
    transform: ${props => props.expand ? "rotate(45deg)" : null};
    transition: transform 0.15s ease-out !important;
    background-color:#40a9ff;
`
const ActionButton = (props) => <StyledFab color={"primary"} size={"small"} style={{ margin: "0.1rem" }} hide={props.hide}>
    <a href={props.href}>
        {props.name}
    </a>
</StyledFab>



export default function Index(props) {
    const [expanded, setExpanded] = useState(true)
    const NavItems = [
        ["趋势", "#Incr"],
        ["地图", "#Map"],
        ["定位", "#local"],
        ["预测", "#Predict"],
        ["同乘", "#Trip"],
        ["动态", "#News"],
        ["头条", "#Toutiao"],
        ["讯息", "#Summary"],
        ["政策", "#Policy"],
        ["资源", "#Resource"],
        // ["关于", "#About"],
        // ["免责", "#Disclaimer"],
        // ["反馈", "#Fallback"],
    ]

    const List = useMemo(() => NavItems.map(([name, link]) => ({ hide }) => (<ActionButton name={name} href={link} key={name} hide={hide} />)), [])




    return (
        <Root>
            {List.map((E, idx) => <E hide={!expanded} key={idx} />)}
            <MainFab
                size={"medium"}
                expand={expanded}
                onClick={() => setExpanded(e => !e)}
            ><AddIcon /></MainFab>
        </Root>
    )
}
