import React, { useState } from "react"
import { IResponseBase } from "../interfaces"
import { Link } from "react-router-dom"
import { RiUserSettingsLine, RiQuestionAnswerLine } from "react-icons/ri"
import { BsX, BsCheck } from "react-icons/bs"
import { useSelector } from "react-redux"
import useCreateResponse from "../hooks/useCreateResponse"
import moment from "moment"
import { RootStore } from "../redux/store"
import "../styles/response.scss"

interface IResponseProps {
  response: IResponseBase
  setNewAnswer?(answer: IResponseBase): void
  onDeleteResponse(id: string): void
}

const Response: React.FC<IResponseProps> = ({
  response,
  setNewAnswer,
  onDeleteResponse,
}) => {
  const hrComplex = "5fbc47e525b10c027c2d5f8b"
  const [replyActive, setReplyActive] = useState(false)
  const [answer, setAnswer] = useState("")
  const { createResponse } = useCreateResponse()
  const {
    auth: { user, token },
  } = useSelector((state: RootStore) => state)

  const handleChangeReply = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }

  const handleSubmitReply = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const newAnswer = await createResponse(hrComplex, answer, response._id)
      setNewAnswer && setNewAnswer(newAnswer)
      setAnswer("")
      setReplyActive(false)
    } catch (error) {}
  }

  const handleFlipReplyActive = () => {
    setReplyActive((prevReplyActive) => !prevReplyActive)
  }

  return (
    <div className='response'>
      {response.owner._id === user._id && (
        <button
          className='response__btn-remove'
          onClick={() => onDeleteResponse(response._id)}>
          <BsX />
        </button>
      )}
      <Link className='response__img-link' to={`/user/${response.owner._id}`}>
        <img
          className='response__user-ava'
          src={response.owner.ava}
          alt='userAva'
        />
        {response.owner.role === "admin" && (
          <RiUserSettingsLine className='response__icon-type' />
        )}
      </Link>
      <div className='response__content'>
        <div className='response__title'>
          <Link
            className='response__text-link'
            to={`/user/${response.owner._id}`}>
            {response.owner.username}
          </Link>
          <span className='response__date'>
            {moment(response.date).calendar()}
          </span>
        </div>
        <div className='response__content-text'>{response.content}</div>
        {!response.response && (
          <div className='reply'>
            <button
              className={`reply__btn-toggle ${
                !token && "reply__btn-toggle--disabled"
              } ${replyActive && "reply__btn-toggle-close"}`}
              onClick={token ? handleFlipReplyActive : () => {}}>
              {replyActive ? (
                <BsX className='reply__toggle-icon' />
              ) : (
                <>
                  <RiQuestionAnswerLine className='reply__toggle-icon' />
                  <span>Відповісти</span>
                </>
              )}
            </button>
            <form
              className={`reply__form ${replyActive && "reply__form--open"}`}
              onSubmit={
                answer.trim().length
                  ? handleSubmitReply
                  : (event) => {
                      event.preventDefault()
                    }
              }>
              <input
                className='reply__input'
                type='text'
                value={answer}
                onChange={handleChangeReply}
              />
              <button
                className={`reply__btn-submit ${
                  !answer.trim().length && "reply__btn-submit--disabled"
                }`}>
                <BsCheck className='reply__btn-icon' />
                <span className='reply__btn-title'>Приняти</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Response
