import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow } from "mdbreact";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



export default class Tableau extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };

    }
    componentDidMount() {
       
        axios.get('https://back-projet-finale-naina.herokuapp.com/atelier')
            .then(response => {
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    state = {
        modal6: false,
    }

    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            ...this.state,
            [modalNumber]: !this.state[modalNumber]
        });
    }


    liste() {
        return <div>
            <div id="listecomponent">
                <h4 id="h4tableau">Albums recents</h4>
                <table className="table table-striped table-bordered table-hover" id="table">
                    <thead>
                        <tr>
                            <th className="thtab">Images</th>
                            <th className="thtab">Titre</th>
                            <th className="thtab">Artiste</th>
                            <th className="thtab">Description</th>
                            <th className="thtab">Date</th>
                            <th className="thtab">genre</th>
                            <th className="thtab">Prix</th>
                            <th className="thtab">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {
                                return <tr key={obj._id}>
                                    <td><img id="imagetab" width="100px" height="90px" src={'https://back-projet-finale-naina.herokuapp.com/atelier/' + obj.photo_produit} alt={obj.photo_produit} /></td>
                                    <td>{obj.titre}</td>
                                    <td>{obj.artiste}</td>
                                    <td>{obj.description}</td>
                                    <td>{obj.date}</td>
                                    <td>{obj.genre}</td>
                                    <td>{obj.prix}  Ar</td>
                                    <td>
                                        {/* boutton modification */}
                                        <Link className="btn btn-primary" onClick={()=>{
                                            document.getElementById("listecomponent").style.display = "none"
                                        }} to={'/admin_album/album/' + obj._id}

                                            id="btn-modifier">Modifier</Link>

                                        {/* Suppression */}
                                        <button className="btn btn-danger" id="suppression" onClick={this.toggle(6)}>Supprimer</button>

                                        <MDBRow id="divsupprimer">
                                            <MDBModal
                                                modalStyle="danger"
                                                className="text-white"
                                                size="sm"
                                                side
                                                position="top-right"
                                                backdrop={false}
                                                isOpen={this.state.modal6}
                                                toggle={this.toggle(6)}
                                            >
                                                <MDBModalHeader
                                                    className="text-center"
                                                    titleClass="w-100"
                                                    tag="p"
                                                    toggle={this.toggle(6)}
                                                >
                                                   Suppression Album
                                            </MDBModalHeader>
                                                <MDBModalBody className="text-center">
                                                    Voulez-vous vraiment supprimer l'album " {obj._id[0]} "
                                                </MDBModalBody>
                                                <MDBModalFooter className="justify-content-center">
                                                    <MDBBtn color="danger" onClick={this.toggle(6)} onClick={(e)=>{
                                                            e.preventDefault()
                                                            axios.get("https://back-projet-finale-naina.herokuapp.com/supprimer/"+obj._id)
                                                            .then()
                                                            .catch(err => console.log(err))
                                                            document.getElementById('divsupprimer').style.display = "none"
                                                            confirmAlert({
                                                                customUI: ({ onClose }) => {
                                                                    return (    
                                                                        <div id="div1">
                                                                            Votre Album est supprimé avec succes
                                                                            <a href="/admin_album" id="bottonanuler" className="btn btn-secondary">OK</a>
                                                                        </div>
                                                                    );
                                                                }
                                                            });
                                                            
                                                        }}
                                                        
                                                        
                                                        >
                                                        Oui
                                                    </MDBBtn>
                                                    <MDBBtn color="danger" outline onClick={this.toggle(6)}>
                                                        Non
                                                    </MDBBtn>
                                                </MDBModalFooter>
                                            </MDBModal>
                                        </MDBRow>


                                        {obj.valid == true ? (<button id="bottondesactivez" className="btn btn-primary" onClick={(e) => {
                                            e.preventDefault()
                                            axios.get("https://back-projet-finale-naina.herokuapp.com/masqueratelier/" + obj._id).then(res => {
                                                axios.get('https://back-projet-finale-naina.herokuapp.com/atelier')
                                                    .then(response => {
                                                        this.setState({ profil: response.data });
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    })
                                            })
                                        }}>Masquer</button>) : (<button id="visual" onClick={(e) => {
                                            e.preventDefault()
                                            axios.get("https://back-projet-finale-naina.herokuapp.com/afficheatelier/" + obj._id).then(res => {
                                                axios.get('https://back-projet-finale-naina.herokuapp.com/atelier')
                                                    .then(response => {
                                                        this.setState({ profil: response.data });
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    })
                                            }
                                            )

                                        }} className="btn btn-secondary" id="bottonactivez">Publier</button>)}


                                    </td>

                                </tr>
                            })) : ('Aucun album à ajouter')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}

            </div>
        );
    }
}