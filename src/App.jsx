setTasks(prev => [...newTasks, ...prev]);
      setInput("");
      setActiveTab("Todo");
      showToast(${newTasks.length} task${newTasks.length > 1 ? "s" : ""} extracted!);
    } catch (err) {
      showToast("Something went wrong. Please try again.", "error");
    }
    setLoading(false);
  };

  const handleToggleStatus = (id, newStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast("Task removed.", "info");
  };

  const filtered = tasks.filter(t => {
    if (activeTab === "All") return true;
    if (activeTab === "Todo") return t.status === "todo";
    if (activeTab === "In Progress") return t.status === "in-progress";
    if (activeTab === "Done") return t.status === "done";
    return true;
  });

  const counts = {
    All: tasks.length,
    Todo: tasks.filter(t => t.status === "todo").length,
    "In Progress": tasks.filter(t => t.status === "in-progress").length,
    Done: tasks.filter(t => t.status === "done").length,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d12",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        color: "#f0ece4",
        padding: "0 0 60px",
      }}
    >
      <style>{
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .card-enter { animation: fadeUp 0.3s ease forwards; }
      }</style>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(255,200,80,0.06) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 24px 24px",
          maxWidth: 680, margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontSize: 28, lineHeight: 1 }}>✦</span>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 28, fontWeight: 700, margin: 0,
              background: "linear-gradient(135deg, #f5e6c8, #d4b483)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: -0.5,
            }}
          >
            Message Vault
          </h1>
        </div>
        <p style={{ margin: "6px 0 0 38px", color: "#666", fontSize: 13, letterSpacing: 0.3 }}>
          Paste your self-messages — AI extracts the tasks inside.
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 24px 0" }}>

        {/* Input Panel */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 20, marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["WhatsApp", "Instagram", "Telegram", "Other"].map(s => (
              <button
                key={s}
                onClick={() => setSource(s)}
                style={{
                  padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 500,letterSpacing: 0.3, cursor: "pointer", transition: "all 0.2s",
                  border: source === s ? "1px solid rgba(245,166,35,0.6)" : "1px solid rgba(255,255,255,0.1)",
                  background: source === s ? "rgba(245,166,35,0.12)" : "transparent",
                  color: source === s ? "#F5A623" : "#666",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Paste your self-message here…&#10;&#10;e.g. 'reminder: call dentist tomorrow, buy groceries on friday, submit report by 5pm today, urgent: renew subscription'"
            rows={5}
            style={{
              width: "100%", background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, padding: "12px 14px", color: "#ccc",
              fontSize: 14, lineHeight: 1.6, resize: "vertical",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onKeyDown={e => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) extractTasks();
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <span style={{ fontSize: 11, color: "#555" }}>⌘↵ to extract</span>
            <button
              onClick={extractTasks}
              disabled={loading || !input.trim()}
              style={{
                padding: "10px 24px", borderRadius: 10, border: "none", cursor: loading ? "wait" : "pointer",
                background: loading || !input.trim()
                  ? "rgba(255,255,255,0.06)"
                  : "linear-gradient(135deg, #c9993f, #e8b84b)",
                color: loading || !input.trim() ? "#555" : "#1a1206",
                fontWeight: 700, fontSize: 13, letterSpacing: 0.5,
                transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 14, height: 14, border: "2px solid #888",
                      borderTopColor: "transparent", borderRadius: "50%",
                      display: "inline-block", animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Extracting…
                </>
              ) : "Extract Tasks ✦"}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "7px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                background: activeTab === tab ? "rgba(245,166,35,0.15)" : "transparent",
                color: activeTab === tab ? "#F5A623" : "#666",
                fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              {tab}
              {counts[tab] > 0 && (
                <span
                  style={{
                    fontSize: 10, background: activeTab === tab ? "rgba(245,166,35,0.3)" : "rgba(255,255,255,0.08)",
                    color: activeTab === tab ? "#F5A623" : "#555",
                    borderRadius: 10, padding: "1px 6px", fontWeight: 600,
                  }}
                >
                  {counts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>{/* Task List */}
        <div>
          {filtered.length === 0 ? (
            <EmptyState filter={activeTab} />
          ) : (
            filtered.map(task => (
              <div key={task.id} className="card-enter">
                <TaskCard task={task} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
            background: toast.type === "error" ? "#3d1010" : toast.type === "info" ? "#1a1a2e" : "#0f2a1a",
            border: 1px solid ${toast.type === "error" ? "#FF4D4D40" : toast.type === "info" ? "#ffffff20" : "#4CAF7D40"},
            color: toast.type === "error" ? "#FF4D4D" : toast.type === "info" ? "#aaa" : "#4CAF7D",
            padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500,
            animation: "slideIn 0.25s ease", zIndex: 9999, whiteSpace: "nowrap",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {toast.msg}
        </div>
      )}

      <style>{
        @keyframes spin { to { transform: rotate(360deg); } }
      }</style>
    </div>
  );
}
                        
