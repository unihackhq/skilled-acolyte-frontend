import React from 'react';
import { Container, Message, MessageHeader, MessageBody, Field,
  Label, Control, Input, Button, Title, Select } from 'bloomer';
import { Link, Redirect } from 'react-router-dom';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiPut } from '../../utils/api';
import './EditProfile.scss';

class EditProfile extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
  }

  constructor(props) {
    super(props);
    this.updateState();
  }

  updateState = () => {
    const { user, university, degree, studyLevel } = this.props.user.details;
    const { firstName, preferredName, lastName, email, dateOfBirth, gender } = user;

    this.state = {
      preferredName,
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      university: university.name,
      degree,
      studyLevel,
      saving: false,
      saved: false,
      error: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { user } = this.props;
    const { firstName, preferredName, lastName, email, gender, degree, studyLevel } = this.state;
    let { dateOfBirth } = this.state;

    try {
      dateOfBirth = new Date(dateOfBirth);
      dateOfBirth = dateOfBirth.toISOString();
    } catch (error) {
      this.setState({ error: 'Date of Birth is not a valid date' });
      return;
    }

    this.setState({ saving: true, saved: false });

    apiPut(`/students/${user.details.id}`, {
      degree,
      studyLevel,
      user: {
        preferredName,
        firstName,
        lastName,
        email,
        dateOfBirth,
        gender,
      },
    })
      .then(
        async () => {
          this.setState({ saving: false, saved: true });
          user.fetchDetails();
        },
        (error) => {
          this.setState({ error: error.body.message, saving: false });
        },
      );
  }

  handleChange = field =>
    (event) => {
      this.setState({ [field]: event.target.value || null });
    }

  handleFirstNameChange = this.handleChange('firstName');
  handleLastNameChange = this.handleChange('lastName');
  handlePreferredNameChange = this.handleChange('preferredName');
  handleEmailChange = this.handleChange('email');
  handleDOBChange = this.handleChange('dateOfBirth');
  handleGenderChange = this.handleChange('gender');
  handleDegreeChange = this.handleChange('degree');
  handleStudyLevelChange = this.handleChange('studyLevel');

  render() {
    const { firstName, preferredName, lastName, email, dateOfBirth, gender,
      university, degree, studyLevel, saving, error, saved } = this.state;

    return (
      <Container>
        {error ? (
          <Message isColor="danger" isFullWidth={false}>
            <MessageHeader>
              Something went wrong!
            </MessageHeader>
            <MessageBody>
              {error}
            </MessageBody>
          </Message>
        ) : null}
        {saved ? (
          <Redirect to="/profile" />
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <Title tag="h2" isSize={4}>Edit Profile</Title>
          <Field>
            <Label htmlFor="edit-profile-first-name">First Name</Label>
            <Control>
              <Input
                id="edit-profile-first-name"
                type="text"
                value={firstName || ''}
                onChange={this.handleFirstNameChange}
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-preferred-name">
              Preferred Name
              <small className="edit-profile__label-subtitle">
                Your preferred name will be used everywhere instead of your first name.
              </small>
            </Label>
            <Control>
              <Input
                id="edit-profile-preferred-name"
                type="text"
                value={preferredName || ''}
                onChange={this.handlePreferredNameChange}
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-last-name">Last Name</Label>
            <Control>
              <Input
                id="edit-profile-last-name"
                type="text"
                value={lastName || ''}
                onChange={this.handleLastNameChange}
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-email">Email</Label>
            <Control>
              <Input
                id="edit-profile-email"
                type="text"
                value={email || ''}
                onChange={this.handleEmailChange}
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-DOB">
              Date of Birth
              <small className="edit-profile__label-subtitle">
                Please enter your date in YYYY-MM-DD format
              </small>
            </Label>
            <Control>
              <Input
                id="edit-profile-DOB"
                type="text"
                value={dateOfBirth || ''}
                onChange={this.handleDOBChange}
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-gender">Gender</Label>
            <Control>
              <Select
                id="edit-profile-gender"
                value={gender || ''}
                onChange={this.handleGenderChange}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </Select>
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-university">
              University
              <small className="edit-profile__label-subtitle">
                Currently we don&apos;t support changing university.
                Please contact us if there is a mistake here.
              </small>
            </Label>
            <Control>
              <Input
                id="edit-profile-university"
                type="text"
                value={university || ''}
                disabled
                title="To change your uni contact us!"
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-degree">Degree</Label>
            <Control>
              <Input
                id="edit-profile-degree"
                type="text"
                value={degree || ''}
                onChange={this.handleDegreeChange}
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="edit-profile-study-level">Year Level</Label>
            <Control>
              <Input
                id="edit-profile-study-level"
                type="text"
                value={studyLevel || ''}
                onChange={this.handleStudyLevelChange}
              />
            </Control>
          </Field>
          <Field isGrouped>
            <Control>
              <Button
                type="submit"
                isColor="primary"
                isLoading={saving}
              >
                Save
              </Button>
            </Control>
            <Control>
              <Button
                render={props => <Link to="/profile" {...props}>Cancel</Link>}
              />
            </Control>
          </Field>
        </form>
      </Container>
    );
  }
}

export default inject('user')(observer(EditProfile));
