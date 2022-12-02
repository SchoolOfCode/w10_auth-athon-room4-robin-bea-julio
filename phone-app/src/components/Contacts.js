import React from "react";

export default function Contacts() {
  return (
    <div>
      <h1>Contacts</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>
              <a href="mailto:Example@.com">Example@.com</a>
            </td>
            <td>123-456-7890</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
