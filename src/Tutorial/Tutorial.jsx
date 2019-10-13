import React, { useState, useEffect, useCallback } from "react";
import cx from "classnames";
import "./Tutorial.scss";

import { useQueryParam, NumberParam } from "use-query-params";

import { CSSTransition } from "react-transition-group";

const data = {
  cols: {
    left: [
      { name: "id", width: 36 },
      { name: "name", width: 80 },
      { name: "role", width: 180 }
    ],
    right: [
      { name: "id", width: 36 },
      { name: "teacher_id", width: 90 },
      {
        name: "saying",
        width: 360,
        style: {
          fontSize: ".8em",
          lineHeight: "1em"
        }
      }
    ]
  },
  rows: [
    {
      left: [1, "Plato", "king philosopher"],
      right: [[1, 1, "Love is a serious mental disease"]]
    },
    {
      left: [2, "Obama", "epic president"],
      right: [
        [2, 2, "Yes we can!"],
        [3, 2, "The future rewards those who press on."],
        [4, 2, "	Whatever we think of the past, we must not be prisoners to it."]
      ]
    },
    {
      left: [3, "Bob Ross", "painter"],
      right: [[null, null, null]],
      leftJoin: true
    },
    {
      left: [4, "Rein", "Codaisseur teacher"],
      right: [
        [
          5,
          4,
          "Writing good Git commit messages helps future employers know that you're a good team-player."
        ]
      ]
    }
  ]
};

export default function Tutorial() {
  const [step = 0, set_step] = useQueryParam("step", NumberParam);

  const onKeyDown = useCallback(
    e => {
      if (e.which === 37 /* left */ || e.which === 38 /* up */) {
        set_step(Math.max(0, Math.min(6, step - 1)));
      } else if (e.which === 39 /* right */ || e.which === 40 /* down */) {
        set_step(Math.max(0, Math.min(6, step + 1)));
      }
    },
    [step]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);

    return () => document.removeEventListener("keydown", onKeyDown, false);
  }, [onKeyDown]);

  const sqlQuery = (
    <>
      <pre className="sql">
        <div>
          SELECT{" "}
          {step === 5 ? (
            <span className="highlight">teachers.*, COUNT(*)</span>
          ) : step === 6 ? (
            <span>
              teachers.*, COUNT(<span className="highlight">sayings.id</span>)
            </span>
          ) : (
            "*"
          )}
        </div>
        <div className={step === 0 ? "highlight" : ""}>FROM teachers</div>
        {step >= 1 && (
          <div>
            <span
              className={step < 3 ? "excluded" : step === 3 ? "highlight" : ""}
            >
              LEFT
            </span>{" "}
            <span className={step >= 1 && step < 3 ? "highlight" : ""}>
              JOIN sayings ON teachers.id = sayings.teacher_id
            </span>
          </div>
        )}
        {step >= 4 && (
          <div className={step === 4 ? "highlight" : ""}>
            GROUP BY teachers.id
          </div>
        )}
      </pre>
      {step === 4 && (
        <p className="error">
          ERROR: column"sayings.id" must appear in the GROUP BY clause or be
          used in an aggregate function
        </p>
      )}
    </>
  );

  const stepExplainer = (
    <div className="text">
      {step === 0 && (
        <>
          <p>
            As a first step, you always want to start with the FROM clause,
            choosing the most appropriate table for the question at hand, and
            just use the asterisk to SELECT everything from that table.
          </p>
          <p>
            For example, if the question is{" "}
            <em>"How many sayings is teacher known for?"</em>, the question is
            mainly one about these teachers, not their sayings. So, we'll start
            with the teachers table.
          </p>
        </>
      )}
      {step === 1 && (
        <>
          <p>
            Next, JOIN any tables that seem necessary for the question at hand.
            In this case, because we want to count their sayings, we're going to
            JOIN that table. When you JOIN, you have to specify a{" "}
            <em>joining equation</em> with ON, which determines which rows in
            the first and second table belong to each other.
          </p>
          <p>
            You can come up with anything you like, but usually this is an
            equation from a <em>relationship</em>. In this example, it's the 1:N
            relationship from teachers to sayings.
          </p>
        </>
      )}
      {step === 2 && (
        <>
          <p>
            Note how the JOIN works when either multiple rows from the joined
            table, or zero rows from the joined table, match up with some row
            from the left table:
          </p>
          <ul>
            <li>
              If multiple rows from the joined table match up with a certain row
              from the left table, that row is "duplicated" to accomodate all
              joined rows.
            </li>
            <li>
              If zero rows from the joined table match up with a certain row
              from the left table, that row is left out of the result set. In
              this case though, we do need these rows, because otherwise we
              can't get an answer like{" "}
              <em>"Bob Ross does not have any sayings"</em>.
            </li>
          </ul>
        </>
      )}
      {step === 3 && (
        <>
          <p>
            In order to keep rows from the left table with no matches in the
            joined table, we specify that we want a LEFT join, instead of a
            normal (INNER) join. Now, we get an "empty" row of NULLs where no
            row of the joined table matched.
          </p>
        </>
      )}
      {step === 4 && (
        <>
          <p>
            In our example, we want to count the number of sayings per teacher.
            So, we GROUP the resulting rows according to which teacher they
            belong to. Unfortunately, this step doesn't produce an intermediate
            result just yet, and instead we get an ERROR from Postgres.
          </p>
          <p>
            To understand this error, you need to imagine these groups, like in
            the visualization below. Postgres will try to "condense" each group
            into a single row, but in this case, Postgres doesn't know how to
            fit the disparate data from the joined table column "id" together
            into a single cell. Hence the error.
          </p>
        </>
      )}
      {step === 5 && (
        <>
          <p>
            This brings us to the final step in our methodical approach to
            writing an SQL query: the SELECT statement. Because of the GROUP BY
            clause, we have to avoid selecting columns that have distinct values
            in the intermediate groups. But, if you GROUP BY some column, you
            can definitely select that column. And if it's a primary key column,
            you can select all of that table's columns.
          </p>
          <p>
            In our case, we'll just select all columns of the teachers table,
            and then a simple aggregate: COUNT. There's just one small error
            remaining in our query (results), can you find it?
          </p>
        </>
      )}
      {step === 6 && (
        <>
          <p>
            The aggregate COUNT(<em>columns</em>) should be read as{" "}
            <em>"Count all non-NULL occurrences of that set of columns"</em>.
            And because the asterisk stands for "all columns", the full row with
            Bob Ross plus a lot of NULLs is not entirely NULL. Therefore, that
            group has 1 not-entirely-NULL row.
          </p>
          <p>
            If we change that to COUNT(sayings.id), Postgres will count all
            non-NULL occurrences of the column sayings.id. Which if course, is
            0. And we've solved our problem!
          </p>
        </>
      )}
    </div>
  );

  return (
    <div className="tutorial">
      <h1>Formulating an SQL query, step by step</h1>
      <p>
        This visualizer tool aims to teach a methodical way for formulating SQL
        queries, by thinking in terms of intermediate queries and their results.
        It can be useful to imagine what kind of "data flow" steps Postgres will
        probably have to perform under the hood to achieve the result of your
        query. Use your arrow keys to step through the example.
      </p>
      <div className="explanation" style={{ height: 190 }}>
        <div className="col left">
          <p>
            <strong>Step:</strong>{" "}
            {[0, 1, 2, 3, 4, 5, 6].map(i => {
              return (
                <button
                  key={i}
                  className={`step ${i === step ? "active" : ""}`}
                  onClick={() => set_step(i)}
                >
                  {i}
                </button>
              );
            })}
          </p>
          {sqlQuery}
        </div>
        <div className="col right">{stepExplainer}</div>
      </div>
      <CSSTransition appear in={step >= 2} timeout={200} classNames="joined">
        <CSSTransition
          appear
          in={step === 4}
          timeout={200}
          classNames="grouped"
        >
          <div className="viz">
            <div className="header">
              <div className="join">
                <div className="left">
                  <div className="row">
                    {data.cols.left.map((col, i) => {
                      return (
                        <div
                          className="cell"
                          key={i}
                          style={{ width: col.width }}
                        >
                          {col.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {step >= 5 ? (
                  <div className="right">
                    <div className="row" style={{ width: 60 }}>
                      <div className="cell">count</div>
                    </div>
                  </div>
                ) : (
                  step >= 1 && (
                    <div className="right">
                      <div className="row">
                        {data.cols.right.map((col, i) => {
                          return (
                            <div
                              className="cell"
                              key={i}
                              style={{ width: col.width }}
                            >
                              {col.name}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="data">
              {data.rows.map(row => {
                const excluded = row.leftJoin && (step === 1 || step === 2);
                const leftRow = row.left;
                return (
                  <div
                    className={`join ${excluded ? "excluded" : ""}`}
                    key={leftRow[0]}
                  >
                    <div className="left">
                      {row.right.map((rightRow, j) => {
                        if ((step < 1 || step >= 4) && j > 0) return null;

                        return (
                          <div
                            className="row"
                            key={leftRow[0] + "-" + rightRow[0]}
                            style={{
                              height:
                                step < 4
                                  ? 32
                                  : row.right.length * 32 +
                                    (row.right.length - 1) * 4
                            }}
                          >
                            {!row.leftJoin && (
                              <CSSTransition
                                in={step === 2}
                                appear
                                classNames="mark"
                              >
                                <div
                                  className={cx(
                                    "mark",
                                    "color-id-" + row.left[0]
                                  )}
                                  style={{ width: data.cols.left[0].width + 2 }}
                                />
                              </CSSTransition>
                            )}
                            {row.leftJoin && (
                              <CSSTransition
                                in={step === 3}
                                appear
                                classNames="mark"
                              >
                                <div className="mark" />
                              </CSSTransition>
                            )}
                            {data.cols.left.map((col, i) => {
                              // if (!b && j > 0) return null;
                              return (
                                <div
                                  className="cell"
                                  key={i}
                                  style={{ width: col.width, ...col.style }}
                                >
                                  <D value={leftRow[i]} />
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                    <div className="right">
                      {step >= 5 ? (
                        <div
                          className="row"
                          style={{
                            width: 60,
                            height:
                              row.right.length * 32 + (row.right.length - 1) * 4
                          }}
                        >
                          <div className="cell">
                            {
                              row.right.filter(r => step === 5 || r[0] !== null)
                                .length
                            }
                          </div>
                        </div>
                      ) : (
                        step >= 1 &&
                        row.right.map((rightRow, j) => {
                          return (
                            <div
                              className="row"
                              key={leftRow[0] + "-" + rightRow[0]}
                            >
                              {!row.leftJoin && (
                                <CSSTransition
                                  in={step === 2}
                                  appear
                                  classNames="mark"
                                >
                                  <div
                                    className={cx(
                                      "mark",
                                      "color-id-" + rightRow[1]
                                    )}
                                    style={{
                                      left: data.cols.right[0].width - 1,
                                      width: data.cols.right[1].width + 2
                                    }}
                                  />
                                </CSSTransition>
                              )}
                              {row.leftJoin && (
                                <CSSTransition
                                  in={step === 3}
                                  appear
                                  classNames="mark"
                                >
                                  <div className="mark" />
                                </CSSTransition>
                              )}
                              {data.cols.right.map((col, i) => {
                                // if (!b && j > 0) return null;
                                return (
                                  <div
                                    className="cell"
                                    key={i}
                                    style={{ width: col.width, ...col.style }}
                                  >
                                    <D value={rightRow[i]} />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })
                      )}
                      <CSSTransition
                        in={step === 4 && row.right.length > 1}
                        appear
                        classNames="mark"
                      >
                        <div
                          className="mark red"
                          style={{
                            width: data.cols.right[0].width + 2,
                            top: 3
                          }}
                        ></div>
                      </CSSTransition>
                      <CSSTransition
                        in={step === 5 && row.right.some(r => r[0] === null)}
                        appear
                        classNames="mark"
                      >
                        <div className="mark red" style={{ top: 3 }}></div>
                      </CSSTransition>
                      <CSSTransition
                        in={step === 6 && row.right.some(r => r[0] === null)}
                        appear
                        classNames="mark"
                      >
                        <div className="mark blue" style={{ top: 3 }}></div>
                      </CSSTransition>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CSSTransition>
      </CSSTransition>
    </div>
  );
}

function D({ value }) {
  return value === null ? <span className="null">NULL</span> : value;
}
