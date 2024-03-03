
import React, {useContext, useEffect, useState} from "react";
import OrgService from "../services/OrgService";
import {IOrg} from "../models";
import {Modal} from "./Modal";
import {ModalContext} from "../context/ModalContext";
import {CreateOrg} from "./CreateOrg";


const example: IOrg ={
    orgId:99,
    orgName:"test",
    orgAnnot:"test",
    orgContacts:"test"
}



export function OrgComponent(){
    const [orgs, setOrgs] = useState<IOrg[]>([]);
    const [details, setDetails] = useState(false)
    const btnBgClassName = details? 'bg-grey': 'bg-white';
    const btnClasses = ['py-2 px-4 border-2', btnBgClassName]
    const {modal, open, close} = useContext(ModalContext)


    useEffect(()=>{
        OrgService.getOrgs().then((response)=>{
           setOrgs(response.data);
        });
    },[]);



    const createHandler = (org: IOrg)=>{
        close()
        OrgService.createOrg(org)
    }


    return(
        <div>
            <h3 className="text-lg-start">Organizations</h3>
            <table className="table table-striped">
                <thead>
                <tr>
                    <td>Org Id</td>
                    <td>Org Name</td>
                    <td>Org Annotation</td>
                    <td>Org Contacts</td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                {orgs.map(org => (
                    <tr key={org.orgId}>
                        <td>{org.orgId}</td>
                        <td>{org.orgName}</td>
                        <td>{org.orgAnnot}</td>
                        <td>{org.orgContacts}</td>
                        <td>
                            <button className={btnClasses.join(' ')} style={{margin: "2px"}}
                                    onClick={() => {
                                        setDetails(prev => !prev);
                                        OrgService.editOrg(org.orgId)
                                    }}
                            >edit
                            </button>
                            <button className={btnClasses.join(' ')} style={{margin: "2px"}}
                                    onClick={() => {
                                        setDetails(prev => !prev);
                                        OrgService.deleteOrg(org.orgId)
                                    }}
                            >delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*{modal && <Modal title="Aboba" onClose={close}><CreateOrg onCreate={createHandler}></CreateOrg></Modal>}*/}
               
            {/*<button className="px-10 py-20" onClick={open}>Create new </button>*/}
            <button className="px-10 py-20" onClick={()=>{OrgService.createOrg(example)}}>Create new</button>
        </div>
    )
}