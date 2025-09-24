"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";

export default function LoginPage() {
  const [data, setData] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, string>>({
    txtCompanyId: "",
    txtLogin: "",
    txtPassword: ""
  });

  useEffect(() => {
    fetch("/data/login-working.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        console.error("Failed to load JSON:", err);
      });
  }, []);

  const getObject = (id: string) => {
    return (data?.objects || []).find((o: any) => o.ui_id === id) || {};
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((s) => ({ ...s, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting form:", form);
    alert("Form submitted (check console).");
  }

  if (!data) {
    return <div style={{ padding: 20 }}>Loading…</div>;
  }

  return (
    <>
      <Head>
        <title>{data.view.title}</title>
      </Head>

      <main style={{ display: "flex", justifyContent: "center", padding: 20, background: "#f6f7fb", minHeight: "100vh" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
            <h1 style={{ margin: 0, fontSize: 20 }}>{data.view.heading}</h1>
            <p style={{ color: "#666", marginTop: 6 }}>{data.view.headingText}</p>

            <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
              {/* Company ID */}
              <div style={{ marginBottom: 12 }}>
                <label htmlFor="txtCompanyId" style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
                  {getObject("txtCompanyId")?.label}
                </label>
                <input
                  id="txtCompanyId"
                  type="text"
                  placeholder={getObject("txtCompanyId")?.placeholder}
                  value={form.txtCompanyId}
                  onChange={handleChange}
                  minLength={getObject("txtCompanyId")?.minLength}
                  maxLength={getObject("txtCompanyId")?.maxLength}
                  readOnly={!!getObject("txtCompanyId")?.isReadOnly}
                  style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
                />
              </div>

              {/* Login ID */}
              <div style={{ marginBottom: 12 }}>
                <label htmlFor="txtLogin" style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
                  {getObject("txtLogin")?.label}
                </label>
                <input
                  id="txtLogin"
                  type="text"
                  placeholder={getObject("txtLogin")?.placeholder}
                  value={form.txtLogin}
                  onChange={handleChange}
                  minLength={getObject("txtLogin")?.minLength}
                  maxLength={getObject("txtLogin")?.maxLength}
                  readOnly={!!getObject("txtLogin")?.isReadOnly}
                  style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 14 }}>
                <label htmlFor="txtPassword" style={{ display: "block", fontSize: 13, marginBottom: 6 }}>
                  {getObject("txtPassword")?.label}
                </label>
                <input
                  id="txtPassword"
                  type={getObject("txtPassword")?.subType === "password" ? "password" : "text"}
                  placeholder={getObject("txtPassword")?.placeholder}
                  value={form.txtPassword}
                  onChange={handleChange}
                  minLength={getObject("txtPassword")?.minLength}
                  maxLength={getObject("txtPassword")?.maxLength}
                  readOnly={!!getObject("txtPassword")?.isReadOnly}
                  style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  background: "#0070f3",
                  color: "#fff",
                  padding: 12,
                  borderRadius: 6,
                  border: "none",
                  fontWeight: 600
                }}
              >
                {getObject("btnSubmit")?.label}
              </button>
            </form>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              
              
              <a href={getObject("lnkForgotPassword")?.target || "#"}>{getObject("lnkForgotPassword")?.label}</a>
            </div>

            <hr style={{ margin: "16px 0" }} />

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              {["imgFingerprint", "imgFaceId", "imgFaceRecognition"].map((id) => {
                const o = getObject(id);
                return (
                  <div key={id} style={{ textAlign: "center" }}>
                    <div style={{ width: 75, height: 56, background: "#f3f3f3", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11 }}>{o.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ width: "100%",display: "grid", justifyContent: "center", marginTop:"30px" }}>
            <p style={{ color: "#666", marginTop: 6 }}>{getObject("lblSignupText")?.label}</p>
            <a href={getObject("btnRequestRegistration")?.target || "#"}
              style={{
                width: "100%",
                background: "#0070f3",
                color: "#fff",
                padding: 12,
                borderRadius: 6,
                border: "none",
                fontWeight: 600
              }}
              >{getObject("btnRequestRegistration")?.label}</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
