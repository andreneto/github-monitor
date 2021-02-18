import React from 'react';
import PropTypes from 'prop-types';
import CommitCard from './CommitCard';

const CommitList = (props) => {
  const { commits } = props;
  return (
    <div>
      <h3>Commits</h3>
      {commits && (
        <div className="row">
          {commits.length !== 0 &&
            commits.map((commit) => (
              <div className="col-sm-12" key={`${commit.sha}`}>
                <CommitCard
                  sha={commit.sha}
                  message={commit.message}
                  authorName={commit.author_name}
                  authorEmail={commit.author_email}
                  authoredAt={commit.authored_at}
                  authorAvatar={commit.author_profile.avatar || ''}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommitList;
