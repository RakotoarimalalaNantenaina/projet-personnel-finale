import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      lastname: "",
      specialite: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/adminpanier");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4" id="Registerrow">
            <MDBRow>
              <MDBCol md="12">
                <form noValidate onSubmit={this.onSubmit}>
                  <p className="h5 text-center mb-4" id="loginp">Inscription de nouveau compte</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Votre nom"
                      icon="user"
                      group
                      onChange={this.onChange}
                      value={this.state.name}
                      id="name"
                      type="text"
                    />

                  <span className="red-text">
                    {errors.name}
                    </span>

                    <MDBInput
                      label="Votre prenom"
                      icon="user"
                      group
                      onChange={this.onChange}
                      value={this.state.lastname}
                      id="lastname"
                      type="text"
                    />
                     <span className="red-text">
                    {errors.name}
                    </span>


                    <MDBInput
                      label="Votre adresse e-mail"
                      icon="envelope"
                      group
                      type="email"
                      success="right"
                      id="email"
                      onChange={this.onChange}
                      value={this.state.email}
                    />
                   <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                    </span>

                    <MDBInput
                      label="Votre mot de passe"
                      icon="lock"
                      group
                      type="password"
                      onChange={this.onChange}
                      value={this.state.password}
                      id="password"
                    />
                    <span className="red-text">
                     {errors.password}
                     </span>
                    <MDBInput
                      label="Confirmer votre mot de passe"
                      icon="lock"
                      group
                      type="password"
                      onChange={this.onChange}
                      value={this.state.password2}
                      id="password2"
                    />
                    <span className="red-text">
                   {errors.password2}
                   </span>
                  </div>
                  <div className="text-center">
                    <MDBBtn type="submit" className="btn btn-primary" id="inscrire-btn">S'inscrire</MDBBtn>
                  </div><br />
                </form>
                <p>J'ai deja un compte sur l' Album Malagasy &nbsp; : <Link to="/login" id="linkseconnecter"> se connecter au panier</Link></p>
              </MDBCol>
            </MDBRow>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
