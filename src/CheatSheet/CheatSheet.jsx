import React from "react";
import cx from "classnames";

import "./CheatSheet.scss";

export default function CheatSheet() {
  return (
    <div className="query">
      <div className="line mb-2">
        <div className="box mb-1">
          <div className="line mb-2">
            <div className="clause mb-1">SELECT</div>
            <div className="stack">
              <div className="var mb-1">column(s)</div>
              <div className="info mb-1">
                You should leave this part to the end ^^, and until then, just
                keep it at *
              </div>
            </div>
          </div>
          <div className="line">
            <div className="clause mb-1">FROM</div>
            <div className="stack">
              <div className="var mb-1">table</div>
              <div className="info" style={{ maxWidth: 220 }}>
                Start here! This is the first important step, and for the while
                being just use SELECT *
              </div>
            </div>
          </div>
        </div>
        <div className="info" style={{ maxWidth: 120 }}>
          The core part of every SQL query. Everything else is optional
        </div>
      </div>
      <div className="line mb-2">
        <div className="box bracket mb-1">
          <div className="line">
            <div className="stack">
              <div className="clause mb-1">LEFT</div>
              <div className="info mb-1" style={{ maxWidth: 180 }}>
                Optional! Do you want to select rows from the FROM table if none
                in the JOINed table match up?
              </div>
            </div>
            <div className="line">
              <div className="clause mb-1">JOIN</div>
              <div className="var mb-1">table</div>
            </div>
            <div className="line">
              <div className="clause mb-1">ON</div>
              <div className="stack">
                <div className="var mb-1">joining equation</div>
                <div className="info" style={{ maxWidth: 400 }}>
                  Used to decide whether each pair of rows, one from the FROM
                  table, and one from the JOINed table, match up. It's totally
                  possibly for multiple matches to happen on the same row, as is
                  often the case with a 1:N or N:N relationship.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="info" style={{ maxWidth: 140 }}>
          You can in fact join as many tables as you want!
        </div>
      </div>
      <div className="line mb-2">
        <div className="clause mb-1">WHERE</div>
        <div className="stack">
          <div className="var mb-1">boolean filter expression</div>
          <div className="info mb-1" style={{ maxWidth: 400 }}>
            Just like in JavaScript, you can combine multiple boolean
            expressions with boolean operators. Different than in JavaScript
            though, you use = for equality instead of == / ===, and you use AND
            / OR instead of && / ||
          </div>
        </div>
      </div>
      <div className="line mb-2">
        <div className="stack">
          <div className="line">
            <div className="clause mb-1">GROUP BY</div>
            <div className="var mb-1">column(s)</div>
          </div>
          <div className="info mb-1" style={{ maxWidth: 700 }}>
            You'll often get an error after adding this clause. Don't panic
            though! Imagine how Postgres is trying to "condense" each group into
            a single row. This is the point when you want to revise your SELECT
            statement. Start out with something simple, like the GROUPed column
            itself, and then add aggregate selections like COUNT(
            <em>column / *</em>).
          </div>
        </div>
      </div>
      <div className="line mb-2">
        <div className="clause mb-1">ORDER BY</div>
        <div className="stack">
          <div className="bracket mb-1">
            <div className="line">
              <div className="var">column</div>
              <div className="stack">
                <div className="clause half mr-0">ASC</div>
                <div className="clause half mr-0">DESC</div>
              </div>
            </div>
          </div>
          <div className="info mb-1" style={{ maxWidth: 240 }}>
            You can add multiple of these, separated by comma's. What effect
            does this have?
          </div>
        </div>
      </div>
      <div className="line mb-2">
        <div className="clause mb-1">LIMIT</div>{" "}
        <div className="var mb-1">number</div>
        <div className="clause mb-1">OFFSET</div>{" "}
        <div className="var mb-1">number</div>
      </div>
    </div>
  );
}
