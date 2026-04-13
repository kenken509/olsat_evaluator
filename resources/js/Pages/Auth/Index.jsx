import { Link, useForm } from '@inertiajs/react'
import { IoHomeOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"
import { HiOutlineAcademicCap } from "react-icons/hi2"
import { useState } from 'react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    post('/login', {
      onFinish: () => reset('password'),
      // onSuccess: () => { } // optional
    })
  }

  return (
    <div className="min-h-screen bg-app flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-8 py-7 bg-primary">
            <div className="flex items-center gap-3">
              <div className="h-20 w-20 rounded-full flex items-center justify-center text-white bg-white">
                <img src='storage/images/logo.png' />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  OLSAT EVALUATOR
                </h1>
                <p className="text-sm text-white/80">
                  Sign in to continue
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">

            {/* If you return a general error from backend, map it to errors.general */}
            {errors.general && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                  placeholder="name@school.edu"
                  autoComplete="username"
                  required
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:text-secondary transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-primary]/20"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-primary transition"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="text-lg hover:cursor-pointer" />
                    ) : (
                      <IoEyeOutline className="text-lg hover:cursor-pointer" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-xs text-red-600">{errors.password}</p>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600 hover:cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="rounded border-slate-300 text-primary focus:ring-[--color-primary]/20 hover:cursor-pointer"
                />
                Remember me
              </label>

              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-secondary transition disabled:opacity-60 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                {processing ? 'Signing in…' : 'Sign in'}
              </button>

              <p className="pt-2 text-center text-xs text-slate-500">
                Authorized personnel only.
              </p>

            </form>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-primary transition flex justify-center items-center gap-1"
          >
            <IoHomeOutline className="text-lg" />
            Back to Home
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Capstone Repository Management System
          <span className="mx-1 text-slate-300">•</span>
          <span className="text-accent font-semibold">v1.0</span>
        </p>

      </div>
    </div>
  )
}
