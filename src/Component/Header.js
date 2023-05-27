import React from "react";

const Header = ({ selectedTeam, teamMemberCount }) => {
  return (
    <div className="container">
      <div className="row justify-content-center my-3">
        <div className="col-8">
          <h1>Team Member Allocation</h1>
          <h3>
            {selectedTeam} has {teamMemberCount} {(teamMemberCount === 1) ? 'Member' : 'Members'}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Header;
