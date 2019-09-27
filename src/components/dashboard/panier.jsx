import React, { Component } from "react";
import axios from 'axios';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow } from "mdbreact";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import StripeCheckout from 'react-stripe-checkout'
class Panier extends Component {
  constructor(props) {
    super(props);
    this.state = {
        profil: [],
        prix: [0]
    };

}

onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
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

  componentDidMount() {
    var test = []
    axios.get('https://back-projet-finale-naina.herokuapp.com/panier')
        .then(response => {
          for(let i=0; i<response.data.length; i++){
            if(response.data[i].id_utilisateur==localStorage.getItem('id_user')){
                test.push(response.data[i])
            }
        }

        this.setState({ profil: test })
        
        this.state.profil.map(pr=>{
            this.state.prix.push(pr.prix)
        })
        this.setState({prix: [...this.state.prix]});
        
        })
        .catch(function (error) {
            console.log(error);
        })
}


  render() {
    return (
      <div className="container-fluid">
        <div id="panierdiv">
        <div id="">
                <h4 id="h4tableau"> Votre Panier</h4>
                <table className="table table-striped " id="table">
                    <thead>
                        <tr>
                            <th className="thtab">Images</th>
                            <th className="thtab">Artiste</th>
                            <th className="thtab">Titre</th>
                            <th className="thtab">Genre</th>
                            <th className="thtab">Prix</th>
                            <th className="thtab">Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {
                                return <tr key={obj._id}>
                                    <td><img id="imagetab" width="100px" height="90px" src={'https://back-projet-finale-naina.herokuapp.com/atelier/' + obj.photo_produit} alt={obj.photo_produit} /></td> 
                                    <td>{obj.artiste}</td>
                                    <td>{obj.titre}</td>
                                    <td>{obj.genre}</td>
                                    <td>{obj.prix}  Ar</td>
                                    <td><button className="btn btn-danger" onClick={this.toggle(6)}>Supprimer</button></td>


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
                                                   Suppression d'un album dans un panier
                                            </MDBModalHeader>
                                                <MDBModalBody className="text-center">
                                                    Voulez-vous vraiment supprimer l'album " {obj.artiste} "
                                                </MDBModalBody>
                                                <MDBModalFooter className="justify-content-center">
                                                    <MDBBtn color="danger"  onClick={(e)=>{
                                                            e.preventDefault()
                                                            axios.get("https://back-projet-finale-naina.herokuapp.com/supprimerpanier/"+obj._id)
                                                            .then()
                                                            .catch(err => console.log(err))
                                                            document.getElementById('divsupprimer').style.display = "none"
                                                            confirmAlert({
                                                                customUI: ({ onClose }) => {
                                                                    return (    
                                                                        <div id="div1">
                                                                            l' Album de votre panier est supprimé avec succes
                                                                            <a href="/adminpanier" id="bottonanuler" className="btn btn-secondary">OK</a>
                                                                        </div>
                                                                    );
                                                                }
                                                            });
                                                            this.toggle(6)
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


                                </tr>
                            })) : ('Votre panier est vide')
                        }
                    </tbody>
                </table>
               <h3 className="h3prix">Prix total = <span id="h3prixtotal">{this.state.prix.reduce((rem,ren)=>
                    rem + ren
                )}</span> Ar</h3>
                    Payment en ligne avec stripe.com : &nbsp;
                  <StripeCheckout  token={this.onToken}
                    stripeKey="pk_test_vrVww8SlifCAMUq8i5Ls6QgR00jHOsxvxx"/>
            </div>
        </div>   
        </div>
    );
  }
}
export default Panier;
