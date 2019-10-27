// using System;
// using System.Linq.Expressions;
// using System.Reflection;
// using Microsoft.EntityFrameworkCore.Metadata;
// using Microsoft.EntityFrameworkCore.Metadata.Internal;

// namespace AspNetCoreSpa.Infrastructure
// {
//     /// <summary>
//     /// When creating any objects with data from the database, make sure any required transformations are made:
//     /// - DateTime should have DateTimeKind.Utc set.
//     /// </summary>
//     /// <remarks>
//     /// See https://volosoft.com/datetime-specifykind-in-entity-framework-core-while-querying/
//     /// See also https://github.com/aspnet/EntityFrameworkCore/issues/4711#issuecomment-358695190 for changes in EF core 2.2
//     /// </remarks>
//     /// <example>
//     /// protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//     /// {
//     ///    optionsBuilder.ReplaceService&lt;IEntityMaterializerSource, EfCoreMaterializerSource>();
//     /// }
//     /// </example>
//     public class EfCoreMaterializerSource : EntityMaterializerSource
//     {
//         /// <summary>
//         /// The DateTime normalize method
//         /// </summary>
//         private static readonly MethodInfo UtcDateTimeNormalizeMethod = typeof(DateTimeMapper).GetTypeInfo().GetMethod(nameof(DateTimeMapper.Normalize));

//         /// <summary>
//         /// The DateTime? normalize method
//         /// </summary>
//         private static readonly MethodInfo UtcDateTimeNormalizeNullableMethod = typeof(DateTimeMapper).GetTypeInfo().GetMethod(nameof(DateTimeMapper.NormalizeNullable));

//         /// <summary>
//         /// This function is called whenever any value is read from the database and needs to be turned into an instance.
//         /// In our case, we're only interested in DateTime fields.
//         /// </summary>
//         /// <remarks>
//         /// This API supports the Entity Framework Core infrastructure and is not intended to be used
//         /// directly from your code. This API may change or be removed in future releases.
//         /// </remarks>
//         public override Expression CreateReadValueExpression(Expression valueBuffer, Type type, int index, IProperty property)
//         {
//             if (type == typeof(DateTime))
//             {
//                 return Expression.Call(UtcDateTimeNormalizeMethod, base.CreateReadValueExpression(valueBuffer, type, index, property));
//             }

//             if (type == typeof(DateTime?))
//             {
//                 return Expression.Call(UtcDateTimeNormalizeNullableMethod, base.CreateReadValueExpression(valueBuffer, type, index, property));
//             }

//             return base.CreateReadValueExpression(valueBuffer, type, index, property);
//         }

//         /// <summary>
//         /// Make sure any DateTime objects are set to UTC.
//         /// </summary>
//         private static class DateTimeMapper
//         {
//             /// <summary>
//             /// Normalizes the specified value.
//             /// </summary>
//             /// <param name="value">The value.</param>
//             /// <returns>The DateTime with UTC kind specified.</returns>
//             public static DateTime Normalize(DateTime value)
//             {
//                 return DateTime.SpecifyKind(value, DateTimeKind.Utc);
//             }

//             /// <summary>
//             /// Normalizes the specified value.
//             /// </summary>
//             /// <param name="value">The value.</param>
//             /// <returns>The DateTime? with UTC kind specified (or null).</returns>
//             public static DateTime? NormalizeNullable(DateTime? value)
//             {
//                 return value.HasValue ? DateTime.SpecifyKind(value.Value, DateTimeKind.Utc) : (DateTime?)null;
//             }
//         }
//     }
// }
