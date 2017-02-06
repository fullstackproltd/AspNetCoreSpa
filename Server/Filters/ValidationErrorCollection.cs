using System.Collections.Generic;
using System.Text;

namespace AspNetCoreSpa.Server.Filters
{
    /// <summary>
    /// A collection of ValidationError objects that is used to collect
    /// errors that occur duing calls to the Validate method.
    /// </summary>
    public class ValidationErrorCollection : List<ValidationError>
    {
        /// <summary>
        /// Adds a new error to the collection
        /// <seealso>Class ValidationErrorCollection</seealso>
        /// </summary>
        /// <param name="Message">
        /// Message of the error
        /// </param>
        /// <param name="FieldName">
        /// optional field name that it applies to (used for Databinding errors on 
        /// controls)
        /// </param>
        /// <param name="ID">
        /// An optional ID you assign the error
        /// </param>
        /// <returns>Void</returns>
        public void Add(string Message, string FieldName = "", string ID = "")
        {
            var error = new ValidationError()
            {
                Message = Message,
                ControlID = FieldName,
                ID = ID
            };
            Add(error);
        }

        /// <summary>
        /// Like Add but allows specifying of a format  
        /// </summary>
        /// <param name="Message"></param>
        /// <param name="FieldName"></param>
        /// <param name="ID"></param>
        /// <param name="arguments"></param>
        public void AddFormat(string Message, string FieldName, string ID, params object[] arguments)
        {
            Add(string.Format(Message, arguments), FieldName, ID);
        }

        /// <summary>
        /// Removes the item specified in the index from the Error collection
        /// </summary>
        /// <param name="Index"></param>
        public void Remove(int Index)
        {
            if (Index > Count - 1 || Index < 0)
                RemoveAt(Index);
        }

        /// <summary>
        /// Adds a validation error if the condition is true. Otherwise no item is 
        /// added.
        /// <seealso>Class ValidationErrorCollection</seealso>
        /// </summary>
        /// <param name="Condition">
        /// If true this error is added. Otherwise not.
        /// </param>
        /// <param name="Message">
        /// The message for this error
        /// </param>
        /// <param name="FieldName">
        /// Name of the UI field (optional) that this error relates to. Used optionally
        ///  by the databinding classes.
        /// </param>
        /// <param name="ID">
        /// An optional Error ID.
        /// </param>
        /// <returns>value of condition</returns>
        public bool Assert(bool Condition, string Message, string FieldName = null, string ID = null)
        {
            if (Condition)
                Add(Message, FieldName, ID);

            return Condition;
        }

        /// <summary>
        /// Asserts a business rule - if condition is true it's added otherwise not.
        /// <seealso>Class ValidationErrorCollection</seealso>
        /// </summary>
        /// <param name="Condition">
        /// If this condition evaluates to true the Validation Error is added
        /// </param>
        /// <param name="Error">
        /// Validation Error Object
        /// </param>
        /// <returns>value of condition</returns>
        public bool Assert(bool Condition, ValidationError Error)
        {
            if (Condition)
                Add(Error);

            return Condition;
        }


        /// <summary>
        /// Returns a string representation of the errors in this collection.
        /// The string is separated by CR LF after each line.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            if (Count < 1)
                return "";

            StringBuilder sb = new StringBuilder(128);

            foreach (ValidationError Error in this)
            {
                sb.AppendLine(Error.Message);
            }

            return sb.ToString();
        }

        /// <summary>
        /// Returns an HTML representation of the errors in this collection.
        /// The string is returned as an HTML unordered list.
        /// </summary>
        /// <returns></returns>
        public string ToHtml()
        {
            if (Count < 1)
                return "";

            StringBuilder sb = new StringBuilder(256);
            sb.Append("<ul>\r\n");

            foreach (ValidationError Error in this)
            {
                sb.Append("<li>");
                if (Error.ControlID != null && Error.ControlID != "")
                    sb.AppendFormat("<a href='#' onclick=\"_errorLinkClick('{0}');return false;\" " +
                                  "style='text-decoration:none'>{1}</a>",
                                  Error.ControlID.Replace(".", "_"), Error.Message);
                else
                    sb.Append(Error.Message);

                sb.AppendLine("</li>");
            }

            sb.Append("</ul>\r\n");
            string script =
            @"    <script>
                function _errorLinkClick(id) {
                    var $t = $('#' + id).focus().addClass('errorhighlight');            
                    setTimeout(function() {
                        $t.removeClass('errorhighlight');
                    }, 5000);
                }
            </script>";
            sb.AppendLine(script);

            return sb.ToString();
        }
    }
}
