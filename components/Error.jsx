import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Error() {
  const error = useRouteError();
  return (
    <div style={{ fontSize: 23, fontWeight: 'bold', textAlign: 'center', color: 'red' }}>Something Went Wrong {error.status}</div>

  )
}
