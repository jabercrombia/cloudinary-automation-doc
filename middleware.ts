// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')

  const basicAuth = auth?.split(' ')[1]
  const [user, pwd] = Buffer.from(basicAuth || '', 'base64')
    .toString()
    .split(':')

  const validUser = process.env.BASIC_AUTH_USER
  const validPwd = process.env.BASIC_AUTH_PASS

  if (user === validUser && pwd === validPwd) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic',
    },
  })
}
