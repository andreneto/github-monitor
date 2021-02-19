import React from 'react';
import PropTypes from 'prop-types';
import CommitCard from '../CommitCard';
import Paginator from '../Paginator/Paginator';
import CommitFilter from '../CommitFilter';

const CommitList = (props) => {
  const {
    commits,
    commitCount,
    currentPageNumber,
    paginationHandler,
    onFilterReset,
    onFilterChange,
    filters,
  } = props;
  return (
    <div>
      <h3>Commits</h3>
      <CommitFilter onReset={onFilterReset} authorEmail={filters.authorEmail} />
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
                  onFilterChange={onFilterChange}
                />
              </div>
            ))}

          {commits.length !== 0 && (
            <Paginator
              currentPageNumber={currentPageNumber}
              pageCount={Math.ceil(commitCount / commits.length)}
              onPageChange={paginationHandler}
            />
          )}
        </div>
      )}
    </div>
  );
};

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.object).isRequired,
  commitCount: PropTypes.number.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  paginationHandler: PropTypes.func.isRequired,
  onFilterReset: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.shape().isRequired,
};

export default CommitList;
